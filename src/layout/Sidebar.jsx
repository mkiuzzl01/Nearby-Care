import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Menu from "../Utility/Menu";

const Sidebar = ({ isOpen, setOpen }) => {
  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };

  const click = () => {
    setOpen(!isOpen);
  };

  const navLink = (
    <>
      <li onClick={click}>
        <Menu link="/" name="Home"></Menu>
      </li>
      <li onClick={click}>
        <Menu link="/Services" name="Services"></Menu>
      </li>
    </>
  );

  const dashboardLinks = (
    <>
      <li onClick={click}>
        <Menu link="/Dashboard" name="User Profile"></Menu>
      </li>

      <li onClick={click}>
        <Menu link="/Dashboard/Add_Appointment" name="Add Appointment"></Menu>
      </li>

      <li onClick={click}>
        <Menu
          link="/Dashboard/Manage_Appointment"
          name="Manage Appointment"
        ></Menu>
      </li>

      <li onClick={click}>
        <Menu link="/Dashboard/Booked_Appointment" name="Your Booked"></Menu>
      </li>

      <li onClick={click}>
        <Menu link="/Dashboard/Service_To_Do" name="Patients Booked"></Menu>
      </li>
    </>
  );

  return (
    <div
      className={`z-40 w-64 md:w-3/12 h-svh  flex flex-col justify-between overflow-x-hidden text-white  bg-[#2F4F4F] space-y-6 px-2 py-4 absolute lg:static inset-y-0 left-0 transform ${
        isOpen && "-translate-x-full "
      }  md:translate-x-0  transition duration-200 ease-in-out`}
    >
      <div>
        <div className="flex justify-center">
          <Link to="/">
            <img
              src="https://i.postimg.cc/C5qTrVN9/Nearby-Care-1-removebg-preview.png"
              alt=""
              className=" w-24 lg:w-40"
            />
          </Link>
        </div>
        <div>
          <ul className="space-y-4 ms-6">{dashboardLinks}</ul>
        </div>
        <div className="divider divider-accent">OR</div>
        <div>
          <ul className="space-y-4 ms-6">{navLink}</ul>
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
