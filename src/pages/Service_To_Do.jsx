import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const Service_To_Do = () => {
  const { user, errorToast, warningToast } = useAuth();
  const [booked, setBooked] = useState([]) || [];

  const getData = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/Service_To_Do/${user?.email}`
    );
    return setBooked(data.data);
  };
  useEffect(() => {
    getData();
  }, [user?.email]);

  //   console.log(booked);

  const handleWorking = async (id, prevStatus, Status) => {
    if (prevStatus === Status) {
      warningToast("Already Updated");
      return;
    }

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/Status/${id}`,
        { Status }
      );
      // console.log(data);
      if (data.modifiedCount) {
        Swal.fire({
          title: "Success!",
          text: "Status Updated Successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      getData();
    } catch (error) {
      // console.log(error.message);
      errorToast("Something Wrong");
      return;
    }
  };

  const handleComplete = async (id, prevStatus, Status) => {
    // console.log(id,prevStatus,Status);
    if (prevStatus === Status) {
      warningToast("Already Updated");
      return;
    }
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/Status/${id}`,
        { Status }
      );
      // console.log(data);
      if (data.modifiedCount) {
        Swal.fire({
          title: "Success!",
          text: "Status Updated Successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      getData();
    } catch (error) {
      // console.log(error.message);
      errorToast("Something Wrong");
      return;
    }
  };
  return (
    <div>
      {booked.length > 0 ? (
        <div className="overflow-x-auto pt-10">
          <h1 className="text-center text-2xl font-bold my-4">
            Patient Booked Appointment Information
          </h1>
          <table className="table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Consulted Info</th>
                <th>Patient Name</th>
                <th>Consultation Cost</th>
                <th>Patient Provide Instruction</th>
                <th>Patient Provide Date</th>
                <th>Action</th>
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
                    <h1>{book?.user?.user_Name}</h1>
                  </td>
                  <td>$ {book?.consultation_Cost}</td>
                  <td>{book?.user?.instruction}</td>
                  <td>{book?.user?.date}</td>
                  <th>
                    <div className="dropdown dropdown-hover dropdown-top">
                      <div tabIndex={0} role="button" className="btn m-1">
                        Take a Action
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] space-y-2 menu shadow bg-base-100 rounded-box"
                      >
                        <li>
                        <button
                        className={
                          book?.user?.status === "Working"
                            ? "btn btn-sm bg-gray-500-500"
                            : "btn btn-sm"
                        }
                         defaultValue={book?.user?.status}>Pending</button>
                        </li>
                        <li>
                        <button
                        onClick={() =>
                          handleWorking(book._id, book?.user?.status, "Working")
                        }
                        className={
                          book?.user?.status === "Working"
                            ? "btn btn-sm bg-yellow-500"
                            : "btn btn-sm"
                        }
                      >
                        Working
                      </button>
                        </li>
                        <li>
                        <button
                        onClick={() =>
                          handleComplete(
                            book._id,
                            book?.user?.status,
                            "Complete"
                          )
                        }
                        className={
                          book?.user?.status === "Complete"
                            ? "btn btn-sm bg-green-600"
                            : "btn btn-sm"
                        }
                      >
                        Complete
                      </button>
                        </li>
                      </ul>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-3xl font-bold mt-32">
            Not Available Patient Appointment
          </h1>
        </div>
      )}
    </div>
  );
};

export default Service_To_Do;
