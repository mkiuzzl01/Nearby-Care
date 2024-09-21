import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvide/AuthProvider";
import Router from "./routes/Route";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={Router}></RouterProvider>
        <ToastContainer limit={3} autoClose={1000}/>
    </AuthProvider>
  </React.StrictMode>
);
