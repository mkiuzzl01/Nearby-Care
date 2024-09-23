import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Loading from "../Utility/Loading";
import Empty from "../Utility/Empty";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Patients_Booked = () => {
  const { user, errorToast, warningToast } = useAuth();
  const [booked, setBooked] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [selectedInstruction, setSelectedInstruction] = useState("");
  const axiosSecure = useAxiosSecure();

  const getData = async () => {
    setIsDataFetched(true);
    const { data } = await axiosSecure.get(`/Patients_Booked/${user?.email}`);
    setBooked(data);
    setIsDataFetched(false);
  };

  useEffect(() => {
    getData();
  }, [user?.email]);

  const handleWorking = async (id, prevStatus, Status) => {
    if (prevStatus === Status) {
      warningToast("Already Updated");
      return;
    }

    try {
      const { data } = await axiosSecure.patch(`/Status/${id}`, { Status });
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
      errorToast("Something Wrong");
      return;
    }
  };

  const handleComplete = async (id, prevStatus, Status) => {
    if (prevStatus === Status) {
      warningToast("Already Updated");
      return;
    }
    try {
      const { data } = await axiosSecure.patch(`/Status/${id}`, { Status });
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
      errorToast("Something Wrong");
      return;
    }
  };

  if (isDataFetched) return <Loading></Loading>;
  if (!booked.length) return <Empty></Empty>;

  return (
    <div>
      <Helmet>
        <title>Nearby Care | To Do Services</title>
      </Helmet>
      <div className="overflow-x-auto pt-10">
        <h1 className="text-center text-2xl font-bold my-4">
          Patient Booked your Appointments
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Consulted Info</th>
              <th>Patient Name</th>
              <th>Consultation Cost</th>
              <th>Patient Instruction</th>
              <th>Provided Date</th>
              <th>Payment Info</th>
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
                  <div>{book?.user?.user_Name}</div>
                  <div className="text-sm opacity-50">
                    {book?.user?.user_Email}
                  </div>
                </td>
                <td>$ {book?.consultation_Cost}</td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      setSelectedInstruction(book?.user?.instruction);
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
                      <p className="py-4">{selectedInstruction}</p>
                    </div>
                  </dialog>
                </td>
                <td>{book?.user?.date}</td>
                <td className="">
                  {book?.user?.transaction ? (
                    <div className="">
                      <p className="text-blue-600">Payment Success</p>
                      <p>
                        <span className="text-blue-600 pe-2">
                          Payment Time:
                        </span>
                        <span>{book?.user?.paymentDate}</span>
                      </p>
                    </div>
                  ) : (
                    <p>Not Payment</p>
                  )}
                </td>
                <td>
                  {book?.user?.status === "Complete" ? (
                    <>
                      <span className="text-green-600">Completed</span>
                    </>
                  ) : (
                    <div className="dropdown dropdown-hover dropdown-top">
                      <div
                        tabIndex={0}
                        role="button"
                        className={
                          book?.user?.status === "Working"
                            ? "btn btn-sm bg-yellow-500"
                            : "btn btn-sm m-1"
                        }
                      >
                        {book?.user?.status}
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] space-y-2 menu shadow bg-base-100 rounded-box"
                      >
                        <li>
                          <button
                            onClick={() =>
                              handleWorking(
                                book._id,
                                book?.user?.status,
                                "Working"
                              )
                            }
                            className={
                              book?.user?.status === "Working"
                                ? "btn btn-sm bg-yellow-500"
                                : "btn btn-sm"
                            }
                            disabled={book?.user?.status === "Working"}
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
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients_Booked;
