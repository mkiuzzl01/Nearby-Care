import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaSpinner } from "react-icons/fa6";

const imgAPI = import.meta.env.VITE_IMG_API_KEY;
const imageHosting = `https://api.imgbb.com/1/upload?key=${imgAPI}`;

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const [Loading, setLoading] = useState(false);

  const { registerUser, profileUpdate, setUser, user, successToast, dark } =
    useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.files[0];
    const pass = form.password.value;

    setLoading(true);

    let image = null;
    if (photo) {
      try {
        const imgPath = new FormData();
        imgPath.append("image", photo);

        const { data } = await axiosPublic.post(imageHosting, imgPath);
        image = data?.data?.display_url;
        setLoading(false);
      } catch (error) {
        toast.error(error?.message, {
          position: "bottom-center",
        });
      }
    }

    setError();

    if (pass.length < 6) {
      toast.error("Something Wrong!", {
        position: "bottom-center",
      });
      setLoading(false);
      return setError("Password must be at least 6 character or longer");
    } else if (!/[A-Z]/.test(pass)) {
      toast.error("Something Wrong!", {
        position: "bottom-center",
      });
      setLoading(false);
      return setError("Should contain at least one upper case");
    } else if (!/[a-z]/.test(pass)) {
      toast.error("Something Wrong!", {
        position: "bottom-center",
      });
      setLoading(false);
      return setError("Should contain at least one lower case");
    }

    setLoading(true);

    try {
      await registerUser(email, pass);
      await profileUpdate(name, image);
      successToast("Registration successful");
      navigate(location?.state ? location.state : "/");
      setLoading(false);

    } catch (error) {
      setLoading(false);
      return setError(error.message.split("/")[1].split(")"));
    }
    form.reset();
    setUser({ user, photoURL: image, displayName: name });
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
        <title>Nearby Care | Registration</title>
      </Helmet>
      <div className="m-auto w-full lg: max-w-6xl items-center flex">
        <div className="hidden bg-cover lg:block lg:w-2/6">
          <img
            src="https://i.postimg.cc/wM4LPS2d/istockphoto-1408025598-612x612.png"
            alt=""
          />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto"></div>

          <p className="mt-3 text-4xl font-bold text-center text-white">
            Registration
          </p>

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
                <span className="block mb-2 text-sm font-medium text-white">
                  Name
                </span>
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
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="block mb-2 text-sm font-medium text-white">
                  Photo
                </span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-2xl input-bordered focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
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
                    {showPass ? <LuEyeOff /> : <FiEye />}
                  </span>
                </div>
              </label>
              <p className="text-red-400">{error}</p>
            </div>
           
            <div className="mt-6">
              <button
                disabled={Loading}
                className="w-full btn border-none bg-gray-500 text-white hover:bg-blue-400"
                type="submit"
              >
                {Loading ? (
                  <FaSpinner size={20} color="red"></FaSpinner>
                ) : (
                  "Registration"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/6 border-b dark:border-gray-600"></span>
            <div className="border-2 p-2 hover:shadow-lg hover:shadow-red-200">
              <p className="text-sm text-white">
                Already have an account?{" "}
                <Link to="/Login" className="text-yellow-300">
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
