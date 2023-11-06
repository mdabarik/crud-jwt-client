import { Link, NavLink } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { GiHomeGarage } from "react-icons/gi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import "./NavBar.css";
import { useContext } from "react";
import { GlobalContext } from "../../providers/GlobalProvider";
import toast from "react-hot-toast";

const NavBar = () => {

    const { user, logOut } = useContext(GlobalContext);

    const handleLogOut = () => {
        logOut()
        .then(res => {
            toast.success("Logout successfull")
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

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
                {
                    !user ?
                        <Link to="/login" className="px-3 py-2 bg-[#db332a] rounded-sm normal-case flex gap-1 text-white border-none hover:bg-[#b5100b] hover:text-white">
                            <CiLogin className="text-2xl"></CiLogin>
                            <span>Login</span>
                        </Link>
                        :
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                                <img className="rounded-full w-[46px] h-[46px]" src={user?.profileUrl} alt="profile" />
                                <p>{user?.displayName}</p>
                            </div>
                            <Link onClick={handleLogOut} className="px-4 py-3 bg-[#db332a] rounded-full normal-case flex gap-1 text-white border-none hover:bg-[#b5100b] hover:text-white">
                                <AiOutlineLogout></AiOutlineLogout>
                                <span>Logout</span>
                            </Link>
                        </div>
                }


            </li>
        </>
    );
};

export default NavBar;