import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Booked_Appointment = () => {
  const { user } = useAuth();
  const [booked, setBooked] = useState([]) || [];

  const getData = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/Booked_Appointment/${user?.email}`
    );
    return setBooked(data.data);
  };
  useEffect(() => {
    getData();
  }, [user?.email]);

  return (
    <div>
      {
        booked.length > 0? <div className="overflow-x-auto">
        <h1 className="text-center text-2xl font-bold my-4">Your Booked Information</h1>
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Expertise Info</th>
              <th>Doctors Info</th>
              <th>Consultation Cost</th>
              <th>Your Provide Instruction</th>
              <th>Date</th>
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
                <td>{book?.user?.instruction}</td>
                <td>{book?.user?.date}</td>
                <th>
                  <button className={book?.user?.status === "Complete" ? 'btn bg-green-400 btn-xs':book?.user?.status === 'Working'?'btn bg-yellow-600 btn-xs':'btn btn-xs bg-gray-200'}>
                    {book?.user?.status}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div> :
      <div>
      <h1 className="text-center text-3xl font-bold mt-32">You are not Book any Appointment</h1>
    </div>
      }
    </div>
  );
};

export default Booked_Appointment;
