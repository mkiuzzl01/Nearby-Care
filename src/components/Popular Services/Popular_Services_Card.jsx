import PropTypes from "prop-types";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Popular_Services_Card = ({ service, All_ServicesPage }) => {
  const {
    doctorName,
    doctorImage,
    expertise,
    location,
    photo,
    consultation_cost,
    description,
  } = service;
  return (
    <div>
      <div className={All_ServicesPage ? "visible" : "hidden"}>
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure className="lg:w-1/2 m-auto">
            <img src={photo} alt={expertise} className="lg:w-[700px] lg:h-96" />
          </figure>
          <div className="card-body lg:w-1/2 m-auto">
            <h2 className="card-title">{expertise}</h2>
            <p>
              {doctorName} {description}
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
              <Link>
                <button className="btn btn-outline">View Detail</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={All_ServicesPage ? "hidden" : "visible"}>
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img src={photo} alt={expertise} className="w-full h-64" />
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
            <p className="border-y-2 border-dashed p-4">
              {doctorName} {description.substring(0, 100)} ....
            </p>
            <div className="card-actions items-center">
              <img src={doctorImage} alt="" className="w-10 rounded-full" />
              <p>Dr.{doctorName}</p>
              <Link>
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
