import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";
import { FaMinimize } from "react-icons/fa6";
import { FaList } from "react-icons/fa";

const Dashboard_Layout = () => {
  const [isOpen, setOpen] = useState(true);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <div className="m-auto">
        <div className="relative md:flex">

          
          {/* This is NavLink part  */}
          <Sidebar isOpen={isOpen} setOpen={setOpen}></Sidebar>


          {/* this is content part */}
          <div className="w-full md:ml-64 lg:m-5">
            <div className="flex justify-end">
              <button onClick={toggleMenu} className="md:hidden px-4 py-3">
                {isOpen ? (
                  <FaList className="text-orange-600 text-2xl" />
                ) : (
                  <FaMinimize className="text-orange-600 text-2xl" />
                )}
              </button>
            </div>
            <main className="px-2">
              <Outlet></Outlet>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Layout;
