import { Link } from "react-router-dom";
import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useState } from "react";

const Register = () => {
    const [showPass, setShowPass] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const pass = form.password.value;
    console.log(name,email,photo,pass);

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
          <div className="form-control">
              <label className="label">
                <span className="block mb-2 text-sm font-medium ">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                name="name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="block mb-2 text-sm font-medium ">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 "
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="block mb-2 text-sm font-medium ">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                className="input w-full  input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                name="photo"
              />
            </div>
            <div className="form-control">
              <span className="my-2 block mb-2 text-sm font-medium ">Password</span>
              <label className="input w-full input-bordered  flex items-center gap-2">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  className="grow"
                  name="password"
                  required
                />
                <div>
                  <span onClick={() => setShowPass(!showPass)}>
                    {showPass ? <LuEyeOff /> : <FiEye />}
                  </span>
                </div>
              </label>
              {/* <p className="text-red-600">{error}</p> */}
            </div>  
            <span className="text-xs hover:underline">
                  Forget Password?
                </span>
            <div className="mt-6">
              <input
                className="w-full btn bg-gray-600 text-white hover:bg-blue-400"
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
                <Link to="/Login" className="text-violet-700">
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
