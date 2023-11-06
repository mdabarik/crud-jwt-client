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
            {
                !user ?
                    <li className="flex items-center gap-1">
                        <Link to="/login" className="px-3 py-2 bg-[#db332a] rounded-sm normal-case flex gap-1 text-white border-none hover:bg-[#b5100b] hover:text-white">
                            <CiLogin className="text-2xl"></CiLogin>
                            <span>Login</span>
                        </Link>
                    </li> : ''

            }
            {
                user ?
                    <li className="flex items-center gap-2">
                        <span>{user?.displayName}</span>
                        <Link onClick={handleLogOut} className="px-4 py-3 bg-[#db332a] rounded-full normal-case flex gap-1 text-white border-none hover:bg-[#b5100b] hover:text-white">
                            <AiOutlineLogout className="text-2xl"></AiOutlineLogout>
                            <span>Logout</span>
                        </Link>
                    </li> : ''
            }
            { user ?
                    <img className="rounded-full w-14 h-14" src={user.photoURL} alt="profile" />
                : ''
            }

        </>
    );
};

export default NavBar;