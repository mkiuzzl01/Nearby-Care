import { useLoaderData, useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Update_Appointment = () => {
    const update = useLoaderData();
    const {errorToast,warningToast,} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const expertise = form.expertise.value;
        const doctorEmail = form.email.value;
        const doctorName = form.name.value;
        const consultation_cost = form.cost.value;
        const description = form.description.value;
        const location = form.location.value;
        const photo = form.image.value;
        const updateInfo = {
          doctorName,
          doctorEmail,
          expertise,
          location,
          photo,
          consultation_cost,
          description,
        };
        try {
          const info = await axios.put(
            `http://localhost:5000/Update_Appointment/${update._id}`,
            updateInfo
          );
          if(info.data.modifiedCount>0){
            Swal.fire({
                title: "Updated!",
                text: "Appointment has been Updated.",
                icon: "success",
              });
              form.reset();
            navigate('/Manage_Appointment');
          }else{
            warningToast("Data is Already Updated")
          }
        } catch (error) {
            errorToast("Something Wrong")
        }
      };

    return (
        <div className="py-4">
            <form onSubmit={handleSubmit} className="border-2 p-4  m-auto lg:w-3/4 rounded-lg">
              <h1 className="text-center text-3xl font-semibold my-3 text-green-400">
                Update Your Provided Information
              </h1>
              <div className="flex justify-center">
                <img src={update.photo} alt="" className="lg:w-1/4 h-1/4" />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-4">
                <div className="form-control">
                  <label className="label">
                    <span className="block text-sm font-medium ">
                      Your Name
                    </span>
                  </label>
                  <input
                    defaultValue={update.doctorName}
                    type="text"
                    placeholder="Enter Your Name"
                    className="input input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    name="name"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="block text-sm font-medium">
                      Your Email
                    </span>
                  </label>
                  <input
                    defaultValue={update.doctorEmail}
                    type="email"
                    disabled
                    placeholder="Enter Your Email"
                    className="input input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    name="email"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="block text-sm font-medium ">
                      Expertise Name
                    </span>
                  </label>
                  <select
                    defaultValue={update.expertise}
                    name="expertise"
                    id="expertise"
                    required
                    className="select select-bordered join-item"
                  >
                    <option selected disabled value="Choose">Choose</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="block text-sm font-medium ">
                      Appointment Cost
                    </span>
                  </label>
                  <input
                    defaultValue={update.consultation_cost}
                    placeholder="Appointment Cost"
                    type="text"
                    className="input  input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    name="cost"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="block text-sm font-medium">Location</span>
                  </label>
                  <input
                    defaultValue={update.location}
                    type="text"
                    placeholder="Enter Your Location"
                    className="input input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    name="location"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="block text-sm font-medium">Image URL</span>
                  </label>
                  <input
                    defaultValue={update.photo}
                    type="text"
                    placeholder="Enter Image URL"
                    className="input input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    name="image"
                  />
                </div>
                <div className="form-control lg:col-span-2">
                  <label className="label">
                    <span className="block text-sm font-medium ">
                      Description
                    </span>
                  </label>
                  <textarea
                    defaultValue={update.description}
                    placeholder="Enter Your Description"
                    name="description"
                    cols="5"
                    rows="5"
                    className="textarea input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  ></textarea>
                </div>
              </div>
              <div className="my-2">
                <input
                  type="submit"
                  className="btn w-full text-black hover:text-white bg-green-300"
                  value="Update"
                />
              </div>
            </form>
        </div>
    );
};

export default Update_Appointment;