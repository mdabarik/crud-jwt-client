import { useNavigate } from "react-router-dom";
import ErrorLogo from "../../assets/404.png";
import { MdSimCardAlert } from 'react-icons/md';
import { Helmet } from "react-helmet";


const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col space-y-5 mt-5 items-center justify-center">
            <Helmet>
                <title>404 Not found - Hotel Booking</title>
            </Helmet>

            <div className="flex items-center justify-center">
                <img className="h-[400px]" src={ErrorLogo} alt="Error Photo" />
            </div>
            <h2 className="text-3xl text-center flex gap-3">
                <MdSimCardAlert className="text-4xl text-orange-500"></MdSimCardAlert>
                <span>404 Page Not found</span>
            </h2>
            <button className="btn bg-[orangered] hover:bg-[#ff5500] text-white" onClick={() => navigate('/')}>Back to Home</button>
        </div>
    );
};

export default ErrorPage;