import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import auth from "../Firebase/Firebase.config";
// import axios from "axios";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dark,setDark] = useState(true);
  

  const registerUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const logInUser = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };
  const logOut = () => {
    setLoading(true);
    setUser(null);
    return signOut(auth);
  };
  const profileUpdate = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const successToast = (text) => {
    return toast.success(text, {
      position: "bottom-center",
    });
  };

  const errorToast = (text) => {
    return toast.error(text, {
      position: "bottom-center",
    });
  };
  const warningToast = (text) => {
    return toast.warn(text, {
      position: "bottom-center",
    });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // const userEmail = currentUser?.email || user?.email;
      // const loggedUser = {email:userEmail};
      setLoading(false);

    //   if(currentUser){
    //     axios.post('http://localhost:5000/jwt',loggedUser,{withCredentials:true})
    //     .then(res=>{
    //       console.log('current user data',res.data);
    //     })
    // }
    // else{
    //   axios.post('http://localhost:5000/Logout',loggedUser,{withCredentials:true})
    //       .then(res=>{
    //         console.log('token response', res.data);
    //       })
    // }
    return () => {
      unsubscribe();
    };
  });

  }, []);

  
  const shareTools = {
    user,
    loading,
    dark,
    setDark,
    setUser,
    registerUser,
    logInUser,
    logInWithGoogle,
    logInWithGithub,
    logOut,
    profileUpdate,
    successToast,
    errorToast,
    warningToast,
  };
  return (
    <AuthContext.Provider value={shareTools}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
