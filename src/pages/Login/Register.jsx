import { useState } from "react";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";


const Register = () => {

    const [errorMsg, setErrorMsg] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        console.log(email, password);
    }

    const handleGoogleSignedIn = () => {
        console.log('handle google signin');
    }

    return (
        <div className="flex flex-col mt-[100px] items-center justify-center ">
            <div>
                <h1 className="text-3xl font-light normal-case">Register for New Account</h1>
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
                </div>
                <div className="inline-flex items-center">
                    <label className="cursor-pointer label">
                        <input type="checkbox" className="checkbox checkbox-secondary" required />
                        <span className="label-text ml-3">Accept terms & conditions</span>
                    </label>
                </div>
                <button className="mt-6 flex items-center justify-center w-full bg-[#db332a] py-3 px-6 text-center  text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit" data-ripple-light="true">
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
            <div onClick={handleGoogleSignedIn} className="flex hover:cursor-pointer flex-row items-center justify-center rounded-full border-[1px] p-1 px-5 mt-4 bg-[#9CA3AF95]">
                <FcGoogle className="text-4xl"></FcGoogle>
                <span className="ml-3">Sign in with Google</span>
            </div>
        </div>
    );
};

export default Register;