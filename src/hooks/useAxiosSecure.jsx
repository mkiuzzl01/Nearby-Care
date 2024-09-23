
import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true,   
})
const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(
          (res) => {
            // console.log("sob thik ase");
            return res;
          },
          (error) => {
            // console.log("error track in the interceptor", error);
            
            if (error.response.status === 401 || error.response.status === 403) {
              // console.log("LogOut the user");
              logOut()
                .then(() => {
                    navigate('/Login');
                })
                .then((err) => {
                  console.error(err.message);
                });
            }
            return Promise.reject(error);
          }
        );
      }, []);

    return axiosSecure;
};

export default useAxiosSecure;