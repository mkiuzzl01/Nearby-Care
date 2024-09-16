import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = ({ isOpen }) => {
  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut();
    
  };

  const navLink = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/Services">Services</Link>
      </li>
    </>
  );

  const dashboardLinks = (
    <>
      <li>
        <Link to="Add_Appointment">Add Appointment</Link>
      </li>
      <li>
        <Link to="Manage_Appointment">Manage Appointment</Link>
      </li>

      <li>
        <Link to="Booked_Appointment">Booked Appointment</Link>
      </li>
      <li>
        <Link to="Service_To_Do">Service-To-Do</Link>
      </li>
    </>
  );

  return (
    <div
      className={`z-40  flex flex-col justify-between overflow-x-hidden text-white bg-[#2F4F4F] w-64 md:w-1/4 space-y-6 px-2 py-4 absolute lg:static inset-y-0 left-0 transform ${
        isOpen && "-translate-x-full"
      }  md:translate-x-0  transition duration-200 ease-in-out`}
    >
      <div className="">
        <div className="flex justify-center">
          <Link to="/" className="">
            <img
              src="https://i.postimg.cc/C5qTrVN9/Nearby-Care-1-removebg-preview.png"
              alt=""
              className=" w-24 lg:w-32"
            />
          </Link>
        </div>
        <div className="menu">
          <ul>{dashboardLinks}</ul>
        </div>
        <div className="divider divider-accent">OR</div>
        <div className="menu">
          <ul>{navLink}</ul>
        </div>
      </div>
      <div>
        <div className="menu">
          <button onClick={handleLogout} className="btn btn-sm">
            <FaSignOutAlt className="text-2xl text-red-600" /> LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
