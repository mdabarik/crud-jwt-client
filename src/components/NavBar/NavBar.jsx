import { Link, NavLink } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { GiHomeGarage } from "react-icons/gi";
import { BsFillCartCheckFill } from "react-icons/bs";
import "./NavBar.css";

const NavBar = () => {
    return (
        <>
            <li>
                <NavLink to="/">
                    <FaHome></FaHome>
                    <span>Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/rooms">
                    <GiHomeGarage></GiHomeGarage>
                    <span>Rooms</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/my-booking">
                    <BsFillCartCheckFill></BsFillCartCheckFill>
                    <span>My Booking</span>
                </NavLink>
            </li>
            <li>
                <Link to="/login" className="px-3 py-2 bg-[#db332a] rounded-sm normal-case flex gap-1 text-white border-none hover:bg-[#b5100b] hover:text-white">
                    <CiLogin className="text-2xl"></CiLogin>
                    <span>Login</span>
                </Link>
            </li>
        </>
    );
};

export default NavBar;