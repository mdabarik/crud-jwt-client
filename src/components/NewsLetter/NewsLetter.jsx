import BannerNewsLetter from "./../../assets/bannerNewsLetter.jpg";
import { LuMailPlus } from "react-icons/lu";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../providers/GlobalProvider";
import toast from "react-hot-toast";
import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";

const NewsLetter = () => {
    const axios = useAxios();
    const {user} = useContext(GlobalContext)

    const [email, setEmail] = useState(null);
    const [name, setName] = useState('Anonymous');
    useEffect(() => {
        if (user) {
            setName(user?.displayName);
        }
    }, [])

    const handleNewsletter = () => {
        console.log(email, name);
        axios.put("/api/v1/newsletter", {email, name})
        .then(res => {
            const data = res.data;
            if (data.upsertedCount > 0) {
                toast.success("Successfully subscribed!");
            } else {
                toast.error("You subscribed already")
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="my-10 space-y-4">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-center">Subscribe Now</h2>
                <p className="text-center">Subscribe to get latest deals and promotional email</p>
            </div>
            <div className="rounded-md">
                <div className="relative">
                    <img className="w-full h-[400px] object-cover" src={BannerNewsLetter} alt="Banner News Letter" />
                    <div className="w-full h-[400px] bg-[#00000090] absolute top-0 left-0"></div>
                    <div className="absolute top-0 left-0 w-full h-[400px] text-white flex items-center flex-col justify-center">
                        <h1 className="text-4xl font-bold text-gray-200 uppercase my-4">Enter Your Email</h1>
                        <div className="flex flex-col space-y-2 w-[500px]">
                            <input onChange={e => setEmail(e.target.value)} className="text-gray-400 bg-white rounded-sm px-3 py-2 w-full" type="email" placeholder="Email" />
                            <button onClick={handleNewsletter} className="px-4 py-3 bg-[#db332a] hover:bg-[#c3342d] white rounded-sm font-bold w-full uppercase flex items-center justify-center">
                                <LuMailPlus className="text-xl"></LuMailPlus>
                                <span className="ml-2">Subscribe</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;