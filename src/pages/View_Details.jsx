import { FaLocationDot } from "react-icons/fa6";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const View_Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const info = useLoaderData();
  const { user, errorToast,dark } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const id = form.id.value;
    const expertise_Name = form.Expertise_Name.value;
    const expertise_image = info?.photo;
    const doctor_Email = form.doctor_email.value;
    const doctor_Name = form.Doctor_Name.value;
    const area = info?.location;
    const user_Email = form.user_Email.value;
    const user_Name = form.user_Name.value;
    const date_and_time = new Date(Date.parse(form.date_and_time.value));
    const date = date_and_time.toLocaleString();
    const consultation_Cost = form.cost.value;
    const instruction = form.Instruction.value;
    const status = "pending";
    const booking_info = {
      id,
      expertise_Name,
      expertise_image,
      doctor_Email,
      doctor_Name,
      consultation_Cost,
      area,
      user: {
        user_Email,
        user_Name,
        date,
        instruction,
        status,
      },
    };
    // console.table(booking_info);
    if(user_Email === doctor_Email){
      navigate(location?.state ? location.state : "/Services");
      return errorToast("Something Wrong");
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/Book_Appointment`,
        booking_info
      );
      navigate(location?.state ? location.state : "/Services");
      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Appointment Book Successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      form.reset();
    } catch (error) {
      //   console.log(error.message);
      if (error) {
        errorToast("Something Wrong");
      }
    }
  };
  return (
    <div className="lg:flex">
      <Helmet>
        <title>Nearby Care | View Details </title>
      </Helmet>
      <div className="my-4 lg:w-1/2">
        <div className="w-full max-w-md px-8 py-4 mt-16 rounded-lg shadow-lg border-2">
          <h1 className={dark? `font-serif text-green-200`:`font-serif text-[#004d99]`}>Doctor information:</h1>
          <div className="flex justify-center -mt-16 md:justify-end">
            <img
              src={info?.doctorImage?info.doctorImage:'https://i.postimg.cc/vTN8PMKb/blank-profile-picture-973460-1280.png'}
              alt=""
              className="object-cover w-32 h-32 border-2 border-blue-500 rounded-full"
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
        <div className="max-w-2xl overflow-hidden  rounded-lg shadow-md">
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
                <div>
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                    className="btn bg-[#7fb800] text-white"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box lg:w-1/2 lg:max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <h1 className="text-center text-3xl font-semibold my-3">Book Appointment !</h1>
            <div className="flex justify-center">
              <img src={info?.photo} alt="" className="lg:w-1/4 h-1/4" />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-4">
              <div className="form-control">
                <label className="label">
                  <span className="block text-sm font-medium ">
                    Appointment ID
                  </span>
                </label>
                <input
                  defaultValue={info?._id}
                  disabled
                  type="text"
                  placeholder="Appointment ID"
                  className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  name="id"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="block text-sm font-medium ">
                    Expertise Name
                  </span>
                </label>
                <input
                  defaultValue={info?.expertise}
                  disabled
                  type="text"
                  placeholder="Expertise Name"
                  className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  name="Expertise_Name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="block text-sm font-medium">
                    Doctor Email
                  </span>
                </label>
                <input
                  defaultValue={info?.doctorEmail}
                  disabled
                  type="email"
                  placeholder="Doctor Email"
                  className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  name="doctor_email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="block text-sm font-medium ">
                    Doctor Name
                  </span>
                </label>
                <input
                  defaultValue={info?.doctorName}
                  disabled
                  type="text"
                  placeholder="Doctor Name"
                  className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  name="Doctor_Name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="block text-sm font-medium ">Your Email</span>
                </label>
                <input
                  defaultValue={user?.email}
                  disabled
                  type="email"
                  placeholder="Your Email"
                  className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  name="user_Email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="block text-sm font-medium ">Your Name</span>
                </label>
                <input
                  defaultValue={user?.displayName}
                  disabled
                  type="text"
                  placeholder="Your Name"
                  className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  name="user_Name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="block text-sm font-medium ">
                    Appointment Date and Time
                  </span>
                </label>
                <input
                  required
                  type="datetime-local"
                  className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  name="date_and_time"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="block text-sm font-medium ">
                    Appointment Cost
                  </span>
                </label>
                <input
                  defaultValue={info?.consultation_cost}
                  disabled
                  placeholder="Appointment Cost"
                  type="text"
                  className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  name="cost"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="block text-sm font-medium ">
                  Special Instruction
                </span>
              </label>
              <textarea
                placeholder="Enter Your Instruction (Optional)"
                name="Instruction"
                id=""
                cols="30"
                rows="10"
                className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>
            <div className="my-2">
              <input
                type="submit"
                className={dark?`btn w-full bg-green-700`:`btn w-full bg-sky-300`}
                value="Book Appointment"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default View_Details;
