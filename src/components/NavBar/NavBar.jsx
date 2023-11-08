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
import { FaQuora } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";

const NavBar = () => {

    const { user, logOut, setLoading } = useContext(GlobalContext);

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
                <NavLink className="flex items-center gap-1" to="/">
                    <FaHome></FaHome>
                    <span>Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="flex items-center gap-1" to="/rooms">
                    <GiHomeGarage></GiHomeGarage>
                    <span>Rooms</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="flex items-center gap-1" to="/my-booking">
                    <BsFillCartCheckFill></BsFillCartCheckFill>
                    <span>My Booking</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="flex items-center gap-1" to="/faq">
                    <FaQuora></FaQuora>
                    <span>FAQ</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="flex items-center gap-1" to="/about-us">
                    <AiOutlineTeam></AiOutlineTeam>
                    <span>About Us</span>
                </NavLink>
            </li>
            {
                !user ?
                    <li className="flex items-center gap-1">
                        <Link to="/login" className="px-3 w-full text-center flex items-center justify-center mt-3 py-2 bg-[#db332a] rounded-sm normal-case flex gap-1 text-white border-none hover:bg-[#b5100b] hover:text-white">
                            <CiLogin className="text-2xl"></CiLogin>
                            <span>Login</span>
                        </Link>
                    </li> : ''

            }
            {
                user ?
                    <li className="flex lg:items-center gap-2 mt-4 lg:mt-0">
                        <Link onClick={handleLogOut} className="px-4 py-3 bg-[#db332a] rounded-full normal-case flex gap-1 text-white border-none hover:bg-[#b5100b] hover:text-white">
                            <AiOutlineLogout className="text-2xl"></AiOutlineLogout>
                            <span>Logout</span>
                        </Link>
                    </li> : ''
            }
            { user ?
                    <div className="flex flex-col-reverse items-center mt-5 lg:mt-0">
                        <span className="text-[12px]">{user?.displayName}</span>
                        <img className="rounded-full w-12 h-12 object-cover" src={user.photoURL} alt="profile" />
                    </div>
                : ''
            }

        </>
    );
};

export default NavBar;