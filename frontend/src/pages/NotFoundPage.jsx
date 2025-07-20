import { useNavigate } from "react-router-dom";
import NotFoundImage from "../assets/404.jpg";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center bg-white text-center px-4">
            <img
                src={NotFoundImage}
                alt="404 Not Found"
                className="w-[700px] h-[280px] mb-8"
            />
            <p className="text-lg md:text-xl mb-6">
                Sorry, it looks like the page got lost
            </p>
            <button
                onClick={() => navigate("/")}
                className="bg-[#224957] text-white px-6 py-2 rounded hover:bg-[#1b3c46] transition"
            >
                Back to Home
            </button>
        </div>
    );
};

export default NotFoundPage;
