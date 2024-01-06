import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import HomePage from "../components/Homepage";

const Login = () => {
  // const [user, loading] = useAuthState(auth);
  // const route = useRouter();
  // const googleProvider = new GoogleAuthProvider();
  // const GoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     console.log("rerouting to home page");
  //     route.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     route.push("/");
  //   }
  // }, [user, route]);
  return <HomePage loggedIn={false} />;
};

export default Login;
