import React from "react";
import useAuth from "../hooks/useAuth";

const UserProfile = () => {
  const { user,profileUpdate } = useAuth();


  const handleUpdate = (e) =>{
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    console.log(name);
    // profileUpdate()
  }

  return (
    <div className="space-y-10 flex flex-col mt-10">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-32 lg:w-52 rounded-full"
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
       <input name="name" type="text" placeholder="Enter Your New Name" className="input input-bordered w-full max-w-2xl" />
       <input type="file" className="file-input file-input-bordered w-full max-w-2xl" />
        <button className="btn w-full max-w-2xl">Update Profile</button>
       </div>
       </form>
    </div>
  );
};

export default UserProfile;
