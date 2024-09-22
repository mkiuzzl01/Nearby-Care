import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../Utility/Loading";
import Empty from "../Utility/Empty";

const Manage_Appointment = () => {
  const { user, errorToast } = useAuth();
  const [services, setServices] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [description, setDescription] = useState('');

  //data face here
  const getData = async () => {
    setIsDataFetched(true);
    const url = `${import.meta.env.VITE_API_URL}/Manage_Appointment/${
      user?.email
    }`;
    const { data } = await axios.get(url);
    setServices(data);
    setIsDataFetched(false);
  };

  //call data face function
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
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Appointment has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            getData();
          }
        }
      });
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  if (isDataFetched) return <Loading />;
  if (!services.length) return <Empty />;

  return (
    <div>
      <Helmet>
        <title>Nearby Care | Manage Appointment</title>
      </Helmet>
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
                        <img src={service.image} alt={service.expertise} />
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
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      setDescription(service?.description);
                      document.getElementById("my_modal_3").showModal();
                    }}
                  >
                    See
                  </button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <p className="py-4">{description}</p>
                    </div>
                  </dialog>
                </td>
                <th>
                  <div className="flex flex-col items-center space-y-4">
                    <Link to={`/Dashboard/Update_Appointment/${service?._id}`}>
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
    </div>
  );
};

export default Manage_Appointment;
