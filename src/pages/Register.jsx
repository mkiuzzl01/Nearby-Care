import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    registerUser,
    profileUpdate,
    setUser,
    user,
    successToast,
    dark
  } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const pass = form.password.value;

    setError();
    if (pass.length < 6) {
      toast.error("Something Wrong!", {
        position: "bottom-center",
      });
      return setError("Password must be at least 6 character or longer");
    } else if (!/[A-Z]/.test(pass)) {
      toast.error("Something Wrong!", {
        position: "bottom-center",
      });
      return setError("Should contain at least one upper case");
    } else if (!/[a-z]/.test(pass)) {
      toast.error("Something Wrong!", {
        position: "bottom-center",
      });
      return setError("Should contain at least one lower case");
    }

    try {
      await registerUser(email, pass);
      await profileUpdate(name, photo);
      successToast('Registration successful');
      navigate(location?.state ? location.state : "/");
      form.reset();
    } catch (error) {
     return setError(error.message.split("/")[1].split(")"));
    }
    setUser(...{ user, photoURL: photo, displayName: name });
  };
  return (
    <div className="my-4">
      <Helmet>
        <title>Nearby Care | Registration</title>
      </Helmet>
      <div className={ dark? `flex items-center w-full mx-auto overflow-hidden rounded-lg lg:max-w-6xl p-10 bg-gray-800`:`flex items-center w-full  mx-auto overflow-hidden rounded-lg lg:max-w-6xl p-10 bg-gray-600`}>
        <div className="hidden bg-cover lg:block lg:w-2/6">
          <img
            src="https://i.postimg.cc/wM4LPS2d/istockphoto-1408025598-612x612.png"
            alt=""
          />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto"></div>

          <p className="mt-3 text-4xl font-bold text-center text-white">Registration</p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/6 border-b dark:border-gray-400"></span>

            <span className="text-sm text-center text-gray-100 uppercase dark:text-gray-400 hover:underline">
              Mention Proper information
            </span>

            <span className="w-1/6 border-b dark:border-gray-400"></span>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="block mb-2 text-sm font-medium text-white">Name</span>
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
                <span className="block mb-2 text-sm font-medium text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="block mb-2 text-sm font-medium text-white">
                  Photo URL
                </span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                name="photo"
              />
            </div>
            <div className="form-control">
              <span className="my-2 block mb-2 text-sm font-medium text-white">
                Password
              </span>
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
                  {showPass ? <LuEyeOff/> : <FiEye />}
                  </span>
                </div>
              </label>
              <p className="text-red-600">{error}</p>
            </div>
            <span className="text-xs hover:underline text-white">Forget Password?</span>
            <div className="mt-6">
              <input
                className="w-full btn border-none bg-gray-500 text-white hover:bg-blue-400"
                type="submit"
                value="Registration"
              />
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/6 border-b dark:border-gray-600"></span>
            <div className="border-2 p-2">
              <p className="text-sm text-white">
                Already have an account?{" "}
                <Link to="/Login" className="text-green-300">
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
