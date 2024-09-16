import { FaBriefcaseMedical } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AddAppointment = () => {
    const {user,dark} = useAuth();
  const handleAppointment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const expertise = form.Expertise.value;
    const location = form.Location.value
    const photo = form.Photo.value;
    const consultation_cost = parseInt(form.Consultation_Cost.value);
    const description = form.Description.value;
    const doctorName = user?.displayName;
    const doctorEmail = user?.email;
    const doctorImage = user?.photoURL;
    const doctorInfo = {doctorName,doctorEmail,doctorImage,expertise,location,photo,consultation_cost,description};

    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/Add_Appointment`,doctorInfo);
      if(data.insertedId){
        Swal.fire({
          title: 'Success!',
          text: 'Appointment Created Successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      form.reset();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className={ dark ? `max-w-4xl m-auto my-8 border-2 rounded-lg p-4 bg-gray-500`:`max-w-4xl m-auto my-8 border-2 rounded-lg p-4 bg-sky-600`}
    >
      <Helmet>
          <title>Nearby-Care | Add Appointment </title>
      </Helmet>
      <div>
        <div className="space-y-4 mb-4">
          <h1 className="text-4xl flex space-x-2 justify-center items-center">
            <span>
              <FaBriefcaseMedical className="text-white" />
            </span>
            <span className="text-white">Add Appointment</span>
          </h1>
        </div>
        <form onSubmit={handleAppointment} className="form-control p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="form-control">
              <label htmlFor="Expertise">
                <span className="text-white">Expertise Name:</span>
              </label>
              <select
                name="Expertise"
                id="Expertise"
                className="select select-bordered join-item"
              >
                <option selected disabled>Choose</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Surgery">Surgery</option>
                <option value="Gastroenterology">Gastroenterology</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="Location">
                <span className="text-white">Location:</span>
              </label>
              <input
                required
                name="Location"
                type="text"
                placeholder="Location"
                id="Location"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label htmlFor="Photo">
                <span className="text-white">Photo URL:</span>
              </label>
              <input
                required
                name="Photo"
                type="text"
                placeholder="Photo URL"
                id="Photo"
                className="input input-bordered w-full"

              />
            </div>
            <div className="form-control">
              <label htmlFor="Consultation_Cost">
                <span className="text-white">Consultation Cost:</span>
              </label>
              <input
                required
                name="Consultation_Cost"
                type="text"
                placeholder="Consultation Cost"
                id="Consultation_Cost"
                className="input input-bordered w-full"

              />
            </div>
            <div className="form-control lg:col-span-2">
              <label htmlFor="description">
                <span className="text-white">Description:</span>
              </label>
              <textarea
                className="textarea input-bordered"
                name="Description"
                id="Description"
                cols="30"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className="my-8">
            <div className="lg:col-span-2">
              <input
                required
                type="submit"
                className="btn hover:bg-[#004d99] w-full border-none bg-[#7fb800] dark:hover:text-white"
                value="Add"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
