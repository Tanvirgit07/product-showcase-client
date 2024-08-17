import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";


export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload,setReload] = useState(null)

  const createUser = (email,password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () =>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }


  const userLogout = () => {
    setLoading(true)
    return signOut(auth);
  };



  const saveUser = async user => {
    setLoading(true);
    const currentUser ={
      email : user?.email,
      image : user?.photoURL,
      name : user?.displayName,
    }
    const {data} = await axios
    .put(`${import.meta.env.VITE_API_KEY}/user`,currentUser)
    return data
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser)
            saveUser(currentUser)
            console.log(currentUser)
        }
        else{
          localStorage.removeItem('access-token')
          setUser(null)
        }
        setLoading(false)
    })

    return () => {
        return unsubscribe()
    };
}, [reload])
    const authIfo ={
        createUser,
        user,
        setUser,
        loading,
        updateUserProfile,
        setReload,
        loginUser,
        googleLogin,
        userLogout,
        

    }
    return (
        <AuthContext.Provider value={authIfo}>
            {children}           
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node,
  };

export default AuthProvider;