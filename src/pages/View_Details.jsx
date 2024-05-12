import { FaLocationDot } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";

const View_Details = () => {
  const info = useLoaderData();
  console.log(info);
  return (
    <div className="lg:flex">
      <div className="my-4 lg:w-1/2">
        <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg border-2">
            <h1 className="font-serif text-[#004d99]">Doctor information:</h1>
          <div className="flex justify-center -mt-16 md:justify-end">
            <img
              src={info.doctorImage}
              alt=""
              className="object-cover w-32 h-32 border-2 border-blue-500 rounded-full dark:border-blue-400"
            />
          </div>

          <h2 className="my-2 text-2xl font-semibold  md:mt-0">
            Dr.
            {info.doctorName}
          </h2>

          <p className="mt-2 text-sm ">
            <span>Consultation Area: </span>
            <span className="flex items-center space-x-2">
              <span>
                <FaLocationDot />
              </span>
              <span>{info.location}</span>
            </span>
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 my-4 shadow-lg rounded-xl">
        <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md">
          <img src={info.photo} alt="" className="object-cover w-full h-64" />

          <div className="p-6">
            <div>
              <h1 className="text-2xl font-semibold">{info.expertise}</h1>
              <p className="mt-2 py-4 font-serif">
                {info.doctorName} {info.description}
              </p>
              <p>
                <span className="font-semibold">Consultation Cost:</span>{" "}
                <span>${info.consultation_cost}</span>
              </p>
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={info.doctorImage}
                    alt=""
                    className="object-cover h-10 rounded-full"
                  />
                  <p>Dr.{info.doctorName}</p>
                </div>
                <div><button className="btn bg-[#7fb800] text-white">Book Now</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View_Details;
