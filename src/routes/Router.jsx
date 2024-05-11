import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../components/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services";
import AddAppointment from "../pages/AddAppointment";

const Router = createBrowserRouter([{
    path:'/',
    element:<Root></Root>,
    children:[
        {
            path:'/',
            loader:()=> fetch(`${import.meta.env.VITE_API_URL}/Popular_Services`),
            element:<Home></Home>
        },
        {
            path:'/Login',
            element:<Login></Login>
        },
        {
            path:'/Register',
            element:<Register></Register>
        },
        {
            path:'/Services',
            element:<Services></Services>
        },
        {
            path:'/Add_Appointment',
            element:<AddAppointment></AddAppointment>
        }
    ]
}])

export default Router;