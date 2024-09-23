import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaSpinner } from "react-icons/fa";
import Compressor from "compressorjs";

const imgAPI = import.meta.env.VITE_IMG_API_KEY;
const imageHosting = `https://api.imgbb.com/1/upload?key=${imgAPI}`;

const UserProfile = () => {
  const { user, profileUpdate, errorToast, successToast } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [updating, setUpdate] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const imageFile = form.image.files[0];

    setUpdate(true);

    const compressImage = (file) =>
      new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6,
          success: resolve,
          error: reject,
        });
      });

    let image = user?.photoURL;

    let userName = name;

    if (!name) {
      userName = user?.displayName;
    }

    if (imageFile) {
      try {
        const compressedFile = await compressImage(imageFile);

        const imgPath = new FormData();
        imgPath.append("image", compressedFile);

        const { data } = await axiosPublic.post(imageHosting, imgPath);
        image = data?.data?.display_url;

      } catch (error) {
        setUpdate(false);
        return errorToast(error?.response?.data?.error?.message);
      }
    }

    try {
      form.reset();
      await profileUpdate(userName, image);
      successToast("Profile Updated");
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      errorToast(error?.message);
    } finally {
      setUpdate(false);
    }
  };

  return (
    <div className="space-y-10 flex flex-col mt-10">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-32 h-32 lg:w-52 lg:h-52 rounded-full"
        />
        <div className="divider lg:divider-horizontal">INFO</div>
        <div className="text-start text-xl ms-4">
          <h1>Name: {user?.displayName}</h1>
          <p>Email: {user?.email}</p>
          <p>Creation time: {user?.metadata?.creationTime}</p>
        </div>
      </div>
      <form onSubmit={handleUpdate}>
        <div className="flex w-full justify-center items-center flex-col gap-4 ">
          <input
            name="name"
            type="text"
            placeholder="Enter Your New Name"
            className="input input-bordered w-full max-w-2xl"
          />
          <input
            name="image"
            type="file"
            className="file-input file-input-bordered w-full max-w-2xl"
          />
          <button disabled={updating} className="btn w-full max-w-2xl">
            {updating ? <FaSpinner size={20} color="red" /> : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
