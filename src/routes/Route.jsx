import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../components/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services";
import AddAppointment from "../pages/AddAppointment";
import PrivetRoute from "./PrivetRoute";
import All_Services from "../pages/All_Services";
import View_Details from "../pages/View_Details";
import Manage_Appointment from "../pages/Manage_Appointment";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        loader: async () =>
          fetch(`${import.meta.env.VITE_API_URL}/Popular_Services`),
        element: <Home></Home>,
      },
      {
        path: "/Login",
        element: <Login></Login>,
      },
      {
        path: "/Register",
        element: <Register></Register>,
      },
      {
        path: "/Services",
        element: <Services></Services>,
      },
      {
        path: "/Add_Appointment",
        element: (
          <PrivetRoute>
            <AddAppointment></AddAppointment>
          </PrivetRoute>
        ),
      },
      {
        path: "/All_Services",
        loader: async () =>
          fetch(`${import.meta.env.VITE_API_URL}/Popular_Services`),
        element: <All_Services></All_Services>,
      },
      {
        path: "/View_Details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/View_Details/${params.id}`),
        element: (
          <PrivetRoute>
            <View_Details></View_Details>
          </PrivetRoute>
        ),
      },
      {
        path:"/Manage_Appointment",
        element:<Manage_Appointment></Manage_Appointment>
      }
    ],
  },
]);

export default Router;
