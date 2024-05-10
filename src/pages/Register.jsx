import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
  };
  return (
    <div className="my-4">
      <div className="flex items-center w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2">
          <img
            src="https://i.postimg.cc/wM4LPS2d/istockphoto-1408025598-612x612.png"
            alt=""
          />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto"></div>

          <p className="mt-3 text-4xl font-bold text-center ">Registration</p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/6 border-b dark:border-gray-600"></span>

            <span className="text-sm text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
            Mention Proper information
            </span>

            <span className="w-1/6 border-b dark:border-gray-400"></span>
          </div>

          <form onSubmit={handleRegister}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium ">Name</label>
              <input
                required
                name="name"
                placeholder="Enter Your Name"
                className="block w-full px-4 py-2 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium ">
                Email Address
              </label>
              <input
                required
                name="email"
                placeholder="Enter Your Email"
                className="block w-full px-4 py-2 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium ">
                Photo URL
              </label>
              <input
                name="photo"
                placeholder="Enter Your Photo URL"
                className="block w-full px-4 py-2 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium ">
                  Password
                </label>
                <span className="text-xs hover:underline">
                  Forget Password?
                </span>
              </div>

              <input
                required
                placeholder="Enter Your Password"
                name="password"
                className="block w-full px-4 py-2 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
              />
            </div>

            <div className="mt-6">
              <input
                className="w-full btn bg-gray-600 text-white hover:bg-red-600"
                type="submit"
                value="Registration"
              />
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/6 border-b dark:border-gray-600"></span>
            <div className="border-2 p-2">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/Register" className="text-violet-700">
                  Login
                </Link>
              </p>
            </div>
            <span className="w-1/6 border-b dark:border-gray-600"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
