import PropTypes from "prop-types";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Popular_Services_Card = ({ service, All_ServicesPage }) => {
  const {
    _id,
    doctorName,
    doctorImage,
    expertise,
    location,
    image,
    consultation_cost,
    description,
  } = service;
  return (
    <div>
      <div className={All_ServicesPage ? "visible" : "hidden"}>
        <div className="card lg:card-side border-2  hover:shadow-md duration-200 hover:shadow-green-400">
          <figure className="lg:w-1/2 m-auto transition duration-150 ease-in-out">
            <img src={image} alt={expertise} className="lg:w-[700px] lg:h-60" />
          </figure>
          <div className="card-body lg:ms-2 lg:p-5 lg:w-1/2 lg:h-60">
            <h2 className="card-title">{expertise}</h2>
            <p className="border-x-2 px-4 rounded-lg border-blue-400">
              {doctorName} {description.substring(0,100)} .........
            </p>
            <p>
              <span className="font-semibold">Consultation Cost:</span>{" "}
              <span>${consultation_cost}</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>
                <FaLocationDot />
              </span>
              <span>{location}</span>
            </p>
            <div className="card-actions items-center">
              <img src={doctorImage} alt="" className="w-10 rounded-full" />
              <p>Dr.{doctorName}</p>
              <Link to={`/View_Details/${_id}`}>
                <button className="btn btn-outline">View Detail</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={All_ServicesPage ? "hidden" : "visible hover:-translate-y-5 duration-1000"}>
        <div className="card bg-base-100 border-2 shadow-xl">
          <figure>
            <img src={image} alt={expertise} className="w-full h-64" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{expertise}</h2>
            <div>
              <p>
                <span>Consultation Cost:</span>{" "}
                <span>${consultation_cost}</span>
              </p>
              <p className="flex items-center space-x-2">
                <span>
                  <FaLocationDot />
                </span>
                <span>{location}</span>
              </p>
            </div>
            <p className="border-y-2 border-dashed rounded-xl p-4">
              {doctorName} {description.substring(0, 100)} ....
            </p>
            <div className="card-actions items-center">
              <img src={doctorImage} alt="" className="w-10 rounded-full" />
              <p>Dr.{doctorName}</p>
              <Link to={`/View_Details/${_id}`}>
                <button className="btn btn-outline">View Detail</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Popular_Services_Card.propTypes = {
  service: PropTypes.object,
  All_ServicesPage:PropTypes.object,
};

export default Popular_Services_Card;
