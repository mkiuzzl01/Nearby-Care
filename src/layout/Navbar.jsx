import { Link } from "react-router-dom";

const Navbar = () => {
  const navLink = (
    <>
      <Link to="/">Home</Link>
      <Link to="/Services">Services</Link>
    </>
  );
  const dashboard = (
    <>
      <li>
        <Link to="/Add_Service">Add Service</Link>
      </li>
      <li>
        <Link to="/Manage_Service">Manage Service</Link>
      </li>
      <li>
      <Link to="/Booked_Services">Booked Services</Link>
      </li>
      <li>
      <Link to="/Service_To_Do">Service-To-Do</Link>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar rounded-lg shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
            >
            {navLink}
            <details>
                <summary>Dashboard</summary>
                <ul>
                  {dashboard}
                </ul>
              </details>
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost text-xl">Nearby Care</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center space-x-4">
            {navLink}
            <li>
              <details className="z-10">
                <summary>Dashboard</summary>
                <ul>
                  {dashboard}
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link to='/Login' className="btn">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
