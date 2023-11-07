import { Link, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Logo from "../assets/logo.png";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-white drop-shadow-md">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        <Link className="flex items-center justify-center gap-4" to="/">
                            <img className="h-[46px]" src={Logo} alt="Logo" />
                            <span className="font-bold md:text-2xl">Hotel Booking</span>
                        </Link>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="flex gap-4 items-center h-[60px]">
                            {/* Navbar menu content here */}
                            <NavBar></NavBar>
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <div className="bg-[#f8f8ff] ">
                    <div className="w-[100vw] overflow-hidden mx-auto">
                        <Outlet></Outlet>
                    </div>
                </div>
                <footer className="mt-100">
                    <Footer></Footer>
                </footer>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    {/* Sidebar content here */}
                    <NavBar></NavBar>
                </ul>
            </div>
        </div>
    );
};

export default MainLayout;