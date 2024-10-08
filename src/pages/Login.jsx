import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { Helmet } from "react-helmet";
import auth from "../Firebase/Firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { FaSpinner } from "react-icons/fa6";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    logInUser,
    logInWithGoogle,
    logInWithGithub,
    successToast,
    errorToast,
    dark,
    warningToast,
    updateUserPass,
  } = useAuth();

  //login function
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form?.email?.value;
    const password = form?.password?.value;

    setLoading(true);
    try {
      await logInUser(email, password);
      successToast("Login successful");
      form.reset();
      setLoading(false);
      return navigate(location?.state ? location.state : "/");
    } catch (error) {
      setLoading(false);
      // console.log(error.message);
      return errorToast("Something Wrong");
    }
  };

  const handleWithGoogle = async () => {
    setLoading(true);

    try {
      await logInWithGoogle();
      successToast("Login successful");
      setLoading(false);
      return navigate(location?.state ? location.state : "/");
    } catch (error) {
      setLoading(false);
      // console.log(error.message);
      return errorToast("Something Wrong");
    }
  };
  const handleWithGithub = async () => {
    setLoading(true);
    try {
      await logInWithGithub();
      successToast("Login successful");
      setLoading(false);
      return navigate(location?.state ? location.state : "/");
    } catch (error) {
      setLoading(false);
      // console.log(error.message);
      return errorToast("Something Wrong");
    }
  };

  const handleForgetPass = async () => {
    setLoading(true);
    if (!email.value) {
      setLoading(false);
      return warningToast("Please enter your email address");
    }
    try {
      await sendPasswordResetEmail(auth, email.value);
      successToast("Password reset email sent. Check your inbox.");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return errorToast("Failed to send reset email: " + error.message);
    }
  };

  return (
    <div
      className={
        dark
          ? `bg-gray-800 flex justify-center items-center min-h-screen `
          : `bg-emerald-900 flex justify-center items-center min-h-screen `
      }
    >
      <Helmet>
        <title>Nearby Care | Login</title>
      </Helmet>
      <div className="m-auto w-full lg: max-w-6xl items-center flex">
        <div className="hidden bg-cover lg:block lg:w-2/6">
          <img src="https://i.postimg.cc/GhwPnQ3G/login.png" alt="" />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto"></div>

          <p className="mt-3 text-4xl font-bold text-center text-white">
            Login
          </p>

          {/* Google Sign-in Button */}
          <div
            onClick={handleWithGoogle}
            className="flex items-center hover:shadow-lg hover:shadow-red-200 justify-center mt-4 transition-colors duration-300 transform border rounded-l"
          >
            <div className="px-4 py-2">
              <FaGoogle className="text-2xl text-white" />
            </div>
            <button className="w-5/6 px-4 py-3 font-bold text-center text-white">
              Sign in with Google
            </button>
          </div>

          {/* GitHub Sign-in Button */}
          <div
            onClick={handleWithGithub}
            className="flex items-center hover:shadow-lg hover:shadow-red-200 text-white justify-center mt-4 transition-colors duration-300 transform border rounded-l"
          >
            <div className="px-4 py-2">
              <FaGithub className="text-2xl" />
            </div>
            <div className="w-5/6 px-4 py-3 font-bold text-center">
              Login with Github
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            <span className="text-xs text-center text-gray-100 uppercase dark:text-gray-400 hover:underline">
              or login with email
            </span>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="block mb-2 text-sm font-medium text-white">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input w-full input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                name="email"
                required
                id="email"
              />
            </div>

            <div className="form-control">
              <span className="my-2 block mb-2 text-sm font-medium text-white">
                Password
              </span>
              <label className="input w-full input-bordered flex items-center gap-2">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  className={`grow`}
                  name="password"
                  required
                />
                <div>
                  <span onClick={() => setShowPass(!showPass)}>
                    {showPass ? <LuEyeOff /> : <FiEye />}
                  </span>
                </div>
              </label>
            </div>

            <span
              onClick={handleForgetPass}
              className="text-xs hover:underline text-white"
            >
              Forget Password?
            </span>
            <div className="mt-6">
              <button
              disabled={loading}
                className="w-full btn bg-gray-500 border-none text-white hover:bg-green-600"
                type="submit"
              >
                {loading ? <FaSpinner size={20} color="red"></FaSpinner> : " Login"}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/6 border-b dark:border-gray-600"></span>
            <div className="border-2 p-2 hover:shadow-lg hover:shadow-red-200">
              <p className="text-sm text-white">
                Don't have an account?{" "}
                <Link to="/Register" className="text-yellow-300">
                  Create One
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

export default Login;
