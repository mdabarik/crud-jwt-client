import { createContext } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import firebaseAuth from "../config/firebase.config";
import { useState } from "react";
import { useEffect } from "react";

export const GlobalContext = createContext(null);

const provider = new GoogleAuthProvider();

const GlobalProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleSignIn = () => {
        return signInWithPopup(firebaseAuth, provider);
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const logOut = () => {
        return signOut(firebaseAuth);
    }

    const info = {
        loading,
        setLoading,
        user,
        googleSignIn,
        loginUser,
        registerUser,
        logOut
    }



    useEffect(() => {

        const unsubscribe = onAuthStateChanged(firebaseAuth, currUser => {
            setUser(currUser);
            setLoading(false);
            console.log(currUser);

            /*---------jwt----------*/
            if (currUser) {
                const jwtData = {
                    email: currUser.email,
                    name: currUser.displayName
                }
                fetch('https://crud-jwt-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(jwtData),
                    credentials: 'include'
                })
                    .then(res => res.json())
            } else {
                // logout fetch request
                fetch('https://crud-jwt-server.vercel.app/logout', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({}),
                    credentials: 'include'
                })
                .then(res => {
                    console.log(res.data);
                })
            }
            /*---------jwt----------*/

        })

        return () => {
            return unsubscribe();
        }
    }, [])

    return (
        <GlobalContext.Provider value={info}>
            {children}
        </GlobalContext.Provider>
    )
};

export default GlobalProvider;