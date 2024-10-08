import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../Utility/Loading";
import Empty from "../Utility/Empty";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Result } from "postcss";

const Your_Booked = () => {
  const { user, errorToast } = useAuth();
  const [booked, setBooked] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [instruction, setInstruction] = useState("");
  const axiosSecure = useAxiosSecure();

  const getData = async () => {
    setIsDataFetched(true);
    const url = `/Booked_Appointment/${user?.email}`;
    const { data } = await axiosSecure.get(url);
    setBooked(data);
    setIsDataFetched(false);
  };

  useEffect(() => {
    getData();
  }, [user?.email]);

  const handleDelete = async (info) => {
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
          const { data } = await axiosSecure.delete(
            `/Delete_Booked_Appointment/${info?._id}`
          );
          getData();
          if (data?.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Booked appointment has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
    } catch (error) {
      return errorToast("Something went wrong");
    }
  };

  if (isDataFetched) return <Loading />;
  if (!booked.length) return <Empty />;

  return (
    <div>
      <Helmet>
        <title>Nearby Care | Booked Appointment</title>
      </Helmet>
      <div className="overflow-x-auto">
        <h1 className="text-center text-2xl font-bold my-4">
          Your Booked Appointments
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Expertise Info</th>
              <th>Doctors Info</th>
              <th>Consultation Cost</th>
              <th>Your Instruction</th>
              <th>Date</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {booked.map((book, idx) => (
              <tr key={book._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={book?.expertise_image}
                          alt={book?.expertise_Name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{book?.expertise_Name}</div>
                      <div className="text-sm opacity-50">{book?.area}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <h1>{book?.doctor_Name}</h1>
                </td>
                <td>$ {book?.consultation_Cost}</td>
                <td>
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() => {
                      setInstruction(book?.user?.instruction);
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
                      <p className="py-4">{instruction}</p>
                    </div>
                  </dialog>
                </td>
                <td>{book?.user?.date}</td>
                <td>
                  {book.user?.transaction ? (
                    <span
                      className="text-green-600"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={book.user?.transaction}
                    >
                      {" "}
                      Payment Success
                    </span>
                  ) : (
                    <div className="dropdown dropdown-top dropdown-hover">
                      <div tabIndex={0} role="button" className="btn btn-sm">
                        Click
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content space-y-2 menu bg-base-100 rounded-box z-[1] shadow"
                      >
                        <li>
                          <button
                            onClick={() => handleDelete(book)}
                            className="btn btn-sm btn-error"
                          >
                            Delete
                          </button>
                        </li>{" "}
                        <Link to={`/Payment/${book._id}`}>
                          <button className="btn btn-sm btn-success">
                            Payment
                          </button>
                        </Link>
                      </ul>
                    </div>
                  )}
                </td>
                <th>
                  <button
                    className={
                      book?.user?.status === "Complete"
                        ? "btn text-black bg-green-400 btn-xs"
                        : book?.user?.status === "Working"
                        ? "btn bg-yellow-500 text-black btn-xs"
                        : "btn btn-xs text-black bg-gray-200 animate-pulse"
                    }
                  >
                    {book?.user?.status}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        ;
      </div>
    </div>
  );
};

export default Your_Booked;
