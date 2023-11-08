import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { GlobalContext } from "../../providers/GlobalProvider";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import { Helmet } from "react-helmet";
<Helmet>
    <title>Login - Hotel Booking</title>
</Helmet>

const Register = () => {
    const { user, registerUser, logOut, loginUser } = useContext(GlobalContext);
    const navigate = useNavigate();
    const { googleSignIn } = useContext(GlobalContext);

    if (user) {
        return <Navigate to="/" />
    }

    const [errorMsg, setErrorMsg] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('')

    const handleRegister = (e) => {
        e.preventDefault();
        // reset error
        setErrorMsg("");
        // validation
        if (password !== confirmPassword) {
            setErrorMsg("Password and confirm password doesn't match")
            return;
        } else if (password.length < 6) {
            setErrorMsg("Password must contains 6 or more characters");
            return;
        } else if (!/[A-Z]/.test(password)) {
            setErrorMsg("Password must contains at least 1 uppercase letter")
            return;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setErrorMsg("Password must contain at least 1 special character")
            return;
        }

        registerUser(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                toast.success("Registration successfull.")

                updateProfile(user, {
                    displayName: userName,
                    photoURL: photoURL,
                    reloadUserInfo: {
                        photoUrl: photoURL
                    }
                })

                navigate('/rooms')
                navigate('/')

                logOut();
                loginUser(email, password)
                    .then(userCred => {
                        console.log(userCred.user);
                        // navigate('/')
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(error => {
                if (error.code === "auth/email-already-in-use") {
                    setErrorMsg("Email already exists");
                } else {
                    setErrorMsg(error.code);
                }
            })

    }


    const handleGoogleSignedIn = async () => {
        googleSignIn()
            .then(res => {
                console.log(res, 'res');
                // jwt token
                // useAxios.post('/jwt', { email: user?.email, name: user?.displayName })
                //     .then(response => {
                //         console.log(response.data, 'axios');
                //     })

                toast.success('Google SignIn Successfull')
            })
            .catch(err => {
                setErrorMsg(err.code);
            })
    }



    return (
        <div className="flex flex-col my-8 w-[90%] mx-auto items-center justify-center ">
            <Helmet>
                <title>Register - Hotel Booking</title>
            </Helmet>
            <div>
                <h1 className="text-3xl font-light normal-case">Register Now</h1>
            </div>
            <form onSubmit={handleRegister} className="mt-8 mb-2 w-[95%] md:w-[80%] lg:w-[60%]" autoComplete="off" >
                <div className="mb-4 flex flex-col gap-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input onChange={e => setUserName(e.target.value)} type="text" placeholder="User name" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input onChange={(e) => setPhotoURL(e.target.value)} type="text" placeholder="Enter photo url" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                    </div>
                </div>
                <div className="inline-flex items-center">
                    <label className="cursor-pointer label">
                        <input type="checkbox" className="checkbox checkbox-secondary" required />
                        <span className="label-text ml-3">Accept terms & conditions</span>
                    </label>
                </div>
                <button type="submit" className="mt-6 flex items-center justify-center w-full bg-[#db332a] py-3 px-6 text-center  text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit" data-ripple-light="true">
                    <CiLogin className="text-xl"></CiLogin>
                    <span className="ml-3">Register Now</span>
                </button>

                {
                    errorMsg ? <h2 className="text-center text-red-700 text-sm mt-2">{errorMsg}</h2> : ""
                }

                <div className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                    <span className="mr-2">Already have an account?</span>
                    <Link to="/login"
                        className="font-medium text-[#db332a] transition-colors hover:underline hover:text-blue-700">
                        Login Now
                    </Link>
                </div>

            </form>
            <div onClick={() => handleGoogleSignedIn()} className="flex hover:cursor-pointer flex-row items-center justify-center rounded-full border-[1px] p-1 px-5 mt-4 bg-[#9CA3AF95]">
                <FcGoogle className="text-4xl"></FcGoogle>
                <span className="ml-3">Sign in with Google</span>
            </div>
        </div>
    );
};

export default Register;