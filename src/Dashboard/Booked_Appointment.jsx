import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../Utility/Loading";
import Empty from "../Utility/Empty";
// import useAxiosSecure from "../hooks/useAxiosSecure";

const Booked_Appointment = () => {
  const { user, setLoading } = useAuth();
  const [booked, setBooked] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  // const axiosSecure = useAxiosSecure();

  const getData = async () => {
    setIsDataFetched(true);
    const url = `${import.meta.env.VITE_API_URL}/Booked_Appointment/${
      user?.email
    }`;
    const { data } = await axios.get(url);
    setBooked(data);
    setIsDataFetched(false);
  };

  useEffect(() => {
    getData();
  }, [user?.email]);

  if (isDataFetched) return <Loading />;
  if (!booked.length) return <Empty />;

  return (
    <div>
      <Helmet>
        <title>Nearby Care | Booked Appointment</title>
      </Helmet>
      <div className="overflow-x-auto">
        <h1 className="text-center text-2xl font-bold my-4">
          Your Booked Information
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Expertise Info</th>
              <th>Doctors Info</th>
              <th>Consultation Cost</th>
              <th>Your Provide Instruction</th>
              <th>Date</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {booked.map((book, idx) => 
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
                <td>{book?.user?.instruction}</td>
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
                    <Link to={`/Payment/${book._id}`}>
                      <button className="btn btn-sm">Payment</button>
                    </Link>
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
            )}
          </tbody>
        </table>
        ;
      </div>
    </div>
  );
};

export default Booked_Appointment;
