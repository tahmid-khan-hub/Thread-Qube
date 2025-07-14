import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import app from "../firebase/firebase.config";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signOut, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const AuthProvider = ({ children }) => {

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const auth = getAuth(app);

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signUp = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const GoogleSign = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  }

  const GitHubSign = () => {
    setLoading(true)
    return signInWithPopup(auth, githubProvider);
  }

  const updateUserProfile = (profile) => {
    setLoading(true)
    return updateProfile(auth.currentUser, profile);
  };

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

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
    logOut,
    GoogleSign,
    GitHubSign,
    
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
