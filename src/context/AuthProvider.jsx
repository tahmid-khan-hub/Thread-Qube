import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import app from "../firebase/firebase.config";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const auth = getAuth(app);

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser)
        setLoading(false)
    })
    return() => unsubscribe()
  },[])

  const userInfo = {
    user,
    loading,
    signIn,
    signUp,
    updateUserProfile,

  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
