import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import PrivetRoute from "./PrivetRoute";
import Not_Found from "../pages/Not_Found";
import React, { Suspense } from "react";
import Loading from "../Utility/Loading";
import Dashboard_Layout from "../layout/Dashboard_Layout";
// import Payment from "../Utility/Payment/Payment";

const Home = React.lazy(() => import("../components/Home/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Services = React.lazy(() => import("../pages/Services"));
const View_Details = React.lazy(() => import("../pages/View_Details"));
const Manage_Appointment = React.lazy(() =>
  import("../Dashboard/Manage_Appointment")
);
const Booked_Appointment = React.lazy(() =>
  import("../Dashboard/Booked_Appointment")
);
const Service_To_Do = React.lazy(() => import("../Dashboard/Service_To_Do"));

const Update_Appointment = React.lazy(() =>
  import("../Dashboard/Update_Appointment")
);

const AddAppointment = React.lazy(() => import("../Dashboard/AddAppointment"));
const Payment = React.lazy(() => import("../Utility/Payment/Payment"));
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Not_Found></Not_Found>,
    children: [
      {
        path: "/",
        loader: async () => fetch(`${import.meta.env.VITE_API_URL}/Services`),
        element: (
          <Suspense fallback={<Loading></Loading>}>
            <Home></Home>
          </Suspense>
        ),
      },
      {
        path: "/Services",
        element: (
          <Suspense fallback={<Loading></Loading>}>
            <Services></Services>
          </Suspense>
        ),
      },
      {
        path: "/View_Details/:id",
        loader: async ({ params }) =>
          fetch(`https://nearby-care.vercel.app/View_Details/${params.id}`),
        element: (
          <PrivetRoute>
            <Suspense fallback={<Loading></Loading>}>
              <View_Details></View_Details>
            </Suspense>
          </PrivetRoute>
        ),
      },
      {
        path: "/Payment/:id",
        loader: async ({ params }) =>
          fetch(`https://nearby-care.vercel.app/Payment/${params.id}`),
        element: (
          <Suspense fallback={<Loading></Loading>}>
            <Payment></Payment>
          </Suspense>
        ),
      },
    ],
  },

  // =========================
  //Dashboard Related Routes


  {

    path: "Dashboard",
    element: (
      <PrivetRoute>
        <Dashboard_Layout></Dashboard_Layout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "Add_Appointment",
        element: (
          <Suspense fallback={<Loading></Loading>}>
            <AddAppointment></AddAppointment>
          </Suspense>
        ),
      },
      {
        path: "Manage_Appointment",
        element: (
          <Suspense fallback={<Loading></Loading>}>
            <Manage_Appointment></Manage_Appointment>
          </Suspense>
        ),
      },
      {
        path: "Booked_Appointment",
        element: (
          <Suspense fallback={<Loading></Loading>}>
            <Booked_Appointment></Booked_Appointment>
          </Suspense>
        ),
      },
      {
        path: "Service_To_Do",
        element: (
          <Suspense fallback={<Loading></Loading>}>
            <Service_To_Do></Service_To_Do>
          </Suspense>
        ),
      },
      {
        path:"Update_Appointment/:id",
        loader: async ({ params }) =>
          fetch(`https://nearby-care.vercel.app/View_Details/${params.id}`),
        element: (
          <Suspense fallback={<Loading></Loading>}>
            <Update_Appointment></Update_Appointment>
          </Suspense>
        ),
      },
    ],
  },

  // ==================================
  //Authentication Related Route
  {
    path: "Login",
    element: (
      <Suspense fallback={<Loading></Loading>}>
        <Login></Login>
      </Suspense>
    ),
  },
  {
    path: "Register",
    element: (
      <Suspense fallback={<Loading></Loading>}>
        <Register></Register>
      </Suspense>
    ),
  },
]);

export default Router;
