import { useLoaderData } from "react-router-dom";

const View_Details = () => {
    const info = useLoaderData();
    console.log(info);
    return (
        <div>
            <div className="w-1/2">
            <h1>Appointment Information</h1>
            <h1>Dr.{info.doctorName}</h1>
            <img src={info.doctorImage} alt="" className="w-1/2" />
            <p>{info.location}</p>
            </div>
            <div className="w-1/2">

            </div>
        </div>
    );
};

export default View_Details;