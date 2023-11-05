import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col space-y-5 mt-5 items-center justify-center">
            <h2 className="text-3xl text-center">404! Not found</h2>
            <button className="btn bg-[orangered] hover:bg-[#ff5500] text-white" onClick={() => navigate('/')}>Back to Home</button>
        </div>
    );
};

export default ErrorPage;