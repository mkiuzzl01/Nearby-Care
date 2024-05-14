import { Link } from "react-router-dom";
import error_404  from '../assets/error_404.json'
import Lottie from "lottie-react";

const Not_Found = () => {
    return (
        <div className="text-center my-40 space-y-4">
            <h1 className="text-4xl font-semibold">Page Not Found</h1>
            <Lottie className="w-96 m-auto" animationData={error_404} loop={true} />
            <div>
            <Link to='/'><button className="btn">Go to Home Page</button></Link>
            </div>
        </div>
    );
};

export default Not_Found;