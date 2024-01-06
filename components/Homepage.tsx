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
import { AiFillFacebook } from "react-icons/ai";
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

const HomePage = ({ loggedIn }: { loggedIn: boolean }) => {
  const [user, loading] = useAuthState(auth);
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
  // console.log("loggedin", loggedIn);
  const [open, setOpen] = useState(false);
  const handleCloseStatistics = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!loggedIn) {
      route.push("/login");
    }
  }, []);
  return (
    <Grid sx={{ background: "#E1F6FF" }}>
      <Navbar />
      <Typography
        variant="h4"
        paddingTop="6rem"
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
        marginBottom="1rem"
      >
        Record, Visualize, and Analyze
      </Typography>
      <Stack direction="row" justifyContent={"center"} gap="1rem">
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            background: "#3483eb",
            color: "white",
            fontWeight: "350",
          }}
          onClick={() => setOpen(true)}
        >
          Learn More
        </Button>

        <Dialog open={open} onClose={handleCloseStatistics}>
          <DialogTitle sx={{ background: "#bedce8" }}>Learn More</DialogTitle>

          <DialogContent sx={{ background: "#bedce8" }}>
            <DialogContentText>
              <Typography>
                Understand the correlations that affect your sleep with
                quantifiable evidence!
              </Typography>

              <br />
              <Typography>
                Utilizing advanced Data Visualization and powerful Algorithms,
                gain insights into your weekly sleep quality and duration.
                Visualize correlations and trends, empowering yourself to
                achieve better rest.
              </Typography>
              <br />
            </DialogContentText>
            <img
              style={{ display: "flex", justifyContent: "center" }}
              src="../../images/statistics.png"
              width={300}
            />
          </DialogContent>
          <DialogActions sx={{ background: "#bedce8" }}>
            <Button
              onClick={handleCloseStatistics}
              variant="contained"
              autoFocus
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {!loggedIn && (
          <Button
            // variant="contained"
            sx={{
              // background: "#03a13d",
              color: "#052A42",
              // boxShadow: "100 100",
              textTransform: "none",
              // fontWeight: "200px",
              // textDecoration: "underline",
              fontSize: "1rem",
            }}
            onClick={GoogleLogin}
          >
            <FcGoogle
              style={{
                fontSize: "1.5rem",
              }}
            />{" "}
            &nbsp; Sign in with Google
          </Button>

          // variant="contained"
          // sx={{ background: "#3483eb", color: "white", fontWeight: "350" }}
        )}
      </Stack>
      <Grid
        container
        sx={{ background: "#E1F6FF" }}
        alignItems="center"
        direction="row"
        justifyContent={"center"}
        padding="2rem"
      >
        <Image
          src={"/images/insomnia_form.png"}
          alt="pics"
          width={400}
          height={600}
        />

        <Stack direction="column">
          <Image
            src={"/images/insomnia_line_graph.png"}
            alt="pic"
            width={380}
            height={300}
          />
          <Image
            src={"/images/graph2.png"}
            alt="pic"
            width={380}
            height={300}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HomePage;
