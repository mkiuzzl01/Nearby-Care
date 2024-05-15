import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
// import useAxiosSecure from "../hooks/useAxiosSecure";

const Manage_Appointment = () => {
  const { user, errorToast} = useAuth();
  const [services, setServices] = useState([]);
  // const axiosSecure = useAxiosSecure();

  const getData = async () => {
    const url = `${import.meta.env.VITE_API_URL}/Manage_Appointment/${user?.email}`;
    const { data } = await axios.get(url);
    return setServices(data)
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
          // console.log(data);
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

  return (
    <div>
      <Helmet>
        <title>Nearby Care | Manage Appointment</title>
      </Helmet>
      {services.length > 0 ? (
        <div className="overflow-x-auto">
          <h1 className="text-2xl font-bold text-center my-4">
            Your Appointment Information
          </h1>
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
                      {service.doctorName}{" "}
                      {service?.description.substring(0, 30)} .....
                    </p>
                  </td>
                  <th>
                    <div className="flex flex-col items-center space-y-4">
                      <Link to={`/Update_Appointment/${service._id}`}>
                        <button title="Edit" className="text-xl text-green-600">
                          <FaRegEdit />
                        </button>
                      </Link>
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
        </div>
      ) : (
        <div>
          <h1 className="text-center text-6xl pt-32">Empty</h1>
        </div>
      )}
    </div>
  );
};

export default Manage_Appointment;
