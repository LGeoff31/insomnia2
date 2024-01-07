import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { CiCalendarDate } from "react-icons/ci";
import { CiMobile4 } from "react-icons/ci";
import { GiSleepingBag } from "react-icons/gi";
import { MdSecurity } from "react-icons/md";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Image from "next/image";
import { AiFillFund } from "react-icons/ai";
import { CiWavePulse1 } from "react-icons/ci";
import { FcStatistics } from "react-icons/fc";

import { useMediaQuery } from "@mui/material";
import Footer from "./Footer";

const HomePage = () => {
  const [user] = useAuthState(auth);
  const isMobile = useMediaQuery("(max-width:600px)");
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("rerouting to home page");
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid sx={{ background: "#E1F6FF" }}>
        <Navbar />
        <Typography
          variant="h2"
          paddingTop="6rem"
          display="flex"
          fontSize={{ md: "2.5rem", xs: "1.6rem" }}
          margin="0 auto"
          justifyContent={"center"}
          fontWeight="550"
          color="#008bE7"
        >
          Insomnia
        </Typography>
        <Typography
          variant="h4"
          paddingTop="1rem"
          display="flex"
          fontSize={{ md: "2.2rem", xs: "1.6rem" }}
          margin="0 auto"
          justifyContent={"center"}
          fontWeight="550"
          marginBottom="1rem"
        >
          The best way to track your sleep.
        </Typography>
        <Typography
          fontSize={{ md: "1.5rem", xs: "1.3rem" }}
          display="flex"
          justifyContent={"center"}
          marginBottom="4rem"
        >
          Record, Visualize, and Analyze
        </Typography>
        <Box
          display="flex"
          justifyContent={"center"}
          marginLeft="2rem"
          marginRight="2rem"
        >
          <Stack alignItems="flex-start">
            <Stack direction="row" gap="1rem" justifyContent={"center"}>
              <CiCalendarDate style={{ fontSize: "3rem" }} />
              <Box>
                <Typography fontWeight="400">Simple to record daily</Typography>
                <Typography fontWeight="300">
                  Complete a user-friendly form about your sleep last night in a
                  manner of seconds.
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              gap="1rem"
              justifyContent={"center"}
              marginTop="2rem"
            >
              <CiWavePulse1 style={{ fontSize: "3rem" }} />
              <Box>
                <Typography fontWeight="400">Analyze trends</Typography>
                <Typography fontWeight="300">
                  With a press of a button, understand correlations between
                  factors which affect your sleep.
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              gap="1rem"
              justifyContent={"center"}
              marginTop="2rem"
            >
              <CiMobile4 style={{ fontSize: "3rem" }} />
              <Box>
                <Typography fontWeight="400">Easy-to-use</Typography>
                <Typography fontWeight="300">
                  Fully responsive for all devices, so record your sleep
                  anywhere and at anytime.
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Stack
          direction="row"
          justifyContent={"center"}
          gap="1rem"
          marginTop="4rem"
        >
          {!user && (
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                background: "#03a63c",
                color: "white",
                fontWeight: "200",
                paddingLeft: "0.7rem",
                paddingRight: "1rem",
                borderRadius: "0.3rem",
                fontSize: "1rem",
              }}
              onClick={GoogleLogin}
            >
              &nbsp; Get Started
            </Button>
          )}
          {user && (
            <Button
              href="/FormPage"
              variant="contained"
              sx={{
                textTransform: "none",
                background: "#03a63c",
                color: "white",
                fontWeight: "200",
                paddingLeft: "0.7rem",
                paddingRight: "1rem",
                borderRadius: "0.3rem",
                fontSize: "1rem",
              }}
            >
              &nbsp; Get Started
            </Button>
          )}
        </Stack>
        {/* <Divider sx={{ marginTop: "8rem" }} /> */}
        <Typography
          variant="h4"
          paddingTop="10rem"
          display="flex"
          fontSize={{ md: "2.2rem", xs: "1.6rem" }}
          margin="0 auto"
          justifyContent={"center"}
          fontWeight="550"
          marginBottom="4rem"
        >
          What are the benefits?
        </Typography>
        <Box
          display="flex"
          justifyContent={"center"}
          marginLeft="2rem"
          marginRight="2rem"
        >
          <Stack alignItems="flex-start">
            <Stack direction="row" gap="1rem" justifyContent={"center"}>
              <GiSleepingBag style={{ fontSize: "3rem" }} />
              <Box>
                <Typography fontWeight="400">
                  What affects your sleep?
                </Typography>
                <Typography fontWeight="300">
                  Analyzes the main factors including the amount of physical
                  exercise and stress levels.
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              gap="1rem"
              justifyContent={"center"}
              marginTop="2rem"
            >
              <FcStatistics style={{ fontSize: "3rem" }} />
              <Box>
                <Typography fontWeight="400">
                  Statistics and correlations
                </Typography>
                <Typography fontWeight="300">
                  Built-in calculator providing standard deviation, covariance,
                  and correlation given any two datasets.
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              gap="1rem"
              justifyContent={"center"}
              marginTop="2rem"
            >
              <MdSecurity style={{ fontSize: "3rem" }} />
              <Box>
                <Typography fontWeight="400">
                  Security and account management
                </Typography>
                <Typography fontWeight="300">
                  All your sleep records will be safely stored in our database
                  whenever you log into your account.
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Typography
          paddingTop="3rem"
          display="flex"
          justifyContent="center"
          margin="0 auto"
          marginBottom="3rem"
        >
          Here's an example of how it would look.
        </Typography>

        <Grid
          container
          sx={{
            background: { md: "#c8eef7", xs: "none" },
            boxShadow: { md: "0px 4px 8px rgba(0, 0, 0, 0.2)", xs: "none" },
            borderRadius: "1rem",
          }}
          width="80vw"
          display="flex"
          alignItems="center"
          direction="row"
          justifyContent={"center"}
          margin="0 auto"
          padding="2rem"
          gap="2rem"
        >
          <img
            src={"/images/form_input.png"}
            alt="pics"
            width={380}
            height={610}
          />
          {!isMobile && (
            <Stack direction="column" gap="1rem">
              <img
                src={"/images/line_chart.png"}
                alt="pic"
                width={600}
                height={300}
              />
              <img
                src={"/images/bar_chart.png"}
                alt="pic"
                width={600}
                height={300}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default HomePage;
