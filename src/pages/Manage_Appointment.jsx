import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Manage_Appointment = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);

  const getData = async () => {
    const data = await axios.post(
      `${import.meta.env.VITE_API_URL}/Manage_Appointment/${user?.email}`
    );
    return setServices(data.data);
  };
  useEffect(() => {
    getData();
  }, [user?.email]);

  const handleDelete = ()=>{
    
  }

  return (
    <div>
      <div className="overflow-x-auto">
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
            {services.map((service,idx) => (
              <tr key={service._id}>
                <th>
                  <label>
                    {idx+1}
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={service.photo}
                          alt={service.expertise}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{service.expertise}</div>
                      <div className="text-sm opacity-50">{service.location}</div>
                    </div>
                  </div>
                </td>
                <td><p>$ {service.consultation_cost}</p></td>
                <td><p>{service.doctorName} {service.description}</p></td>
                <th>
                  <button className="btn btn-ghost btn-xs">Edit</button>
                  <button onClick={handleDelete} className="btn btn-ghost btn-xs">Delete</button>
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
