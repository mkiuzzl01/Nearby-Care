import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../components/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Router = createBrowserRouter([{
    path:'/',
    element:<Root></Root>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/Login',
            element:<Login></Login>
        },
        {
            path:'/Register',
            element:<Register></Register>
        }
    ]
}])

export default Router;