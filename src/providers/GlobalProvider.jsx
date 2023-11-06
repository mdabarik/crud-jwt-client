import { createContext } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import firebaseAuth from "../config/firebase.config";
import { useState } from "react";
import { useEffect } from "react";

export const GlobalContext = createContext(null);

const provider = new GoogleAuthProvider();

const GlobalProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(firebaseAuth, provider);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(firebaseAuth);
    }

    const info = {
        loading,
        user,
        googleSignIn,
        loginUser,
        registerUser,
        logOut
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(firebaseAuth, currUser => {
            setUser(currUser);
            setLoading(false);
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