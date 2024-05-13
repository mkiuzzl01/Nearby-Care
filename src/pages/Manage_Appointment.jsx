import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Manage_Appointment = () => {
  const { user, errorToast } = useAuth();
  const [services, setServices] = useState([])
  // console.log(services);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const getData = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/Manage_Appointment/${user?.email}`
    );
    return setServices(data.data);
  };
  useEffect(() => {
    getData();
  }, [user?.email]);

  const handleDelete = async (_id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete(
            `${import.meta.env.VITE_API_URL}/Delete_Appointment/${_id}`
          );
          console.log(data);
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Appointment has been deleted.",
              icon: "success",
            });
            getData();
          }
        }
      });
    } catch (error) {
      errorToast("Something wrong");
      //   console.log(error);
    }
  };

  const handleEdit = async (_id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/View_Details/${_id}`
      );
      return setData(data);
    } catch (error) {
      console.log(error);
    }
  };
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
        `http://localhost:5000/Update_Appointment/${data._id}`,
        updateInfo
      );
    //   console.log(info.data);
      if(info.data.modifiedCount>0){
        Swal.fire({
            title: "Updated!",
            text: "Appointment has been Updated.",
            icon: "success",
          });
          getData();
          form.reset();
        navigate('/Manage_Appointment');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {services.length > 0? <div className="overflow-x-auto">
        <h1 className="text-2xl font-bold text-center my-4">Your Appointment Information</h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Expertise Category Info</th>
              <th>Consultation Cost</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, idx) => (
              <tr key={service._id}>
                <th>
                  <label>{idx + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={service.photo} alt={service.expertise} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{service.expertise}</div>
                      <div className="text-sm opacity-50">
                        {service.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>$ {service.consultation_cost}</p>
                </td>
                <td>
                  <p className="">
                    {service.doctorName} {service.description}
                  </p>
                </td>
                <th>
                  <div className="flex flex-col items-center space-y-4">
                    <button
                      onClick={() => {
                        document.getElementById("my_modal_3").showModal();
                        handleEdit(service._id)
                      }}
                      title="Edit"
                      className="text-xl text-green-600"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(service._id)}
                      className="text-3xl text-red-500"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {/* modal */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box lg:w-1/2 lg:max-w-5xl">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleSubmit}>
              <h1 className="text-center text-3xl font-semibold my-3">
                Location
              </h1>
              <div className="flex justify-center">
                <img src={data.photo} alt="" className="lg:w-1/4 h-1/4" />
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-4">
                <div className="form-control">
                  <label className="label">
                    <span className="block text-sm font-medium ">
                      Your Name
                    </span>
                  </label>
                  <input
                    defaultValue={data.doctorName}
                    type="text"
                    placeholder="Enter Your Name"
                    className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
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
                    defaultValue={data.doctorEmail}
                    type="email"
                    disabled
                    placeholder="Enter Your Email"
                    className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
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
                    defaultValue={data.expertise}
                    name="expertise"
                    id="expertise"
                    required
                    className="select select-bordered join-item"
                  >
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
                    defaultValue={data.consultation_cost}
                    placeholder="Appointment Cost"
                    type="text"
                    className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    name="cost"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="block text-sm font-medium">Location</span>
                  </label>
                  <input
                    defaultValue={data.location}
                    type="text"
                    placeholder="Enter Your Location"
                    className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    name="location"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="block text-sm font-medium">Image URL</span>
                  </label>
                  <input
                    defaultValue={data.photo}
                    type="text"
                    placeholder="Enter Image URL"
                    className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
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
                    defaultValue={data.description}
                    placeholder="Enter Your Description"
                    name="description"
                    cols="30"
                    rows="10"
                    className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  ></textarea>
                </div>
              </div>
              <div className="my-2">
                <input
                  type="submit"
                  className="btn w-full bg-sky-300"
                  value="Update"
                />
              </div>
            </form>
          </div>
        </dialog>
      </div> :
      <div>
        <h1 className="text-center text-3xl font-bold pt-32">You are not add any Appointment</h1>
      </div>
      }
    </div>
  );
};

export default Manage_Appointment;
