import { RiseLoader } from "react-spinners";

const Loading = () => {
    return (
        <div className="text-center pt-36">
            <div className="p-4">
            <RiseLoader color="#36d7b7" />
            </div>
            <div>
                <h1 className="font-bold">Please Wait...</h1>
            </div>
        </div>
    );
};

export default Loading;