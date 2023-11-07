import { Link } from "react-router-dom";
import Logo from "./../../assets/logo.png";
import { FaTwitter } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
/*** AOS Animation ***/
import 'aos/dist/aos.css';
import AOS from "aos";
import { useEffect } from "react";

const Footer = () => {

    useEffect(() => {
        AOS.init()
    }, [])


    const footerLinks = <>
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/my-booking">My Booking</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/about-us">About Us</Link>
    </>

    const socialLinks = <>
        <Link to="#">
            <FaTwitter className="text-3xl"></FaTwitter>
        </Link>
        <Link to="#">
            <BsYoutube className="text-3xl"></BsYoutube>
        </Link>
        <Link to="#">
            <BsFacebook className="text-3xl"></BsFacebook>
        </Link>
    </>

    return (
        <div className="py-12 flex flex-col" data-aos="zoom-in">
            <div className="flex flex-col items-center justify-center gap-y-3">
                <img src={Logo} alt="Logo" />
                <h2 className="text-2xl">Hotel Booking</h2>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 link">
                {footerLinks}
            </div>
            <div className="flex items-center justify-center gap-4 mt-6 link">
                {socialLinks}
            </div>
        </div>
    );
};

export default Footer;