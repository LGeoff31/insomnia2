import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { GiNightSleep } from "react-icons/gi";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {}
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) return <h1>Loading...</h1>;
  // if (!user) route.push("/login");
  return (
    <>
      <Box
        display="flex"
        sx={{ background: "#E1F6FF" }}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingTop="0.5rem"
        paddingBottom="0.5rem"
      >
        <Stack direction="row" alignItems={"center"} gap="1rem">
          <Link
            href="/"
            marginLeft="1rem"
            sx={{
              alignItems: "center",
              textDecoration: "none",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0.3rem",
              paddingBottom: "0.3rem",

              marginLeft: { md: "2rem", xs: "1rem" },

              "&:hover": {
                textDecoration: "none",
                backgroundColor: "rgba(0, 0, 0, 0.07)",
                borderRadius: "0.5rem",
              },
            }}
          >
            <Typography
              // color="#052A42"
              color="black"
              // fontWeight="400"
              fontSize={{ md: "1.5rem", xs: "0.75rem" }}
              alignItems="center"
              display={{ md: "flex", xs: "block" }}
            >
              <GiNightSleep style={{ fontSize: "2rem" }} />
            </Typography>
          </Link>
        </Stack>
        <Stack
          direction="row"
          gap={{ md: "1rem", sm: "0.75rem", xs: "0.2rem" }}
          alignItems={"center"}
        >
          {user && (
            <Link
              href="/FormPage"
              fontSize={{ md: "1.5rem", xs: "0.75rem" }}
              sx={{
                textDecoration: "none",
                color: "black",

                // padding: { md: "1rem", xs: "1rem" },
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.3rem",
                paddingBottom: "0.3rem",
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: "rgba(0, 0, 0, 0.07)",
                  borderRadius: "0.5rem",
                },
              }}
            >
              <Typography sx={{ fontSize: { md: "1rem", xs: "0.75rem" } }}>
                Form
              </Typography>
            </Link>
          )}
          {user && (
            <Link
              href="formData"
              fontSize={{ md: "1.5rem", xs: "0.75rem" }}
              sx={{
                textDecoration: "none",
                // padding: "1rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.3rem",
                paddingBottom: "0.3rem",
                color: "black",

                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.07)",
                  borderRadius: "0.5rem",
                },
              }}
            >
              <Typography sx={{ fontSize: { md: "1rem", xs: "0.75rem" } }}>
                Data
              </Typography>
            </Link>
          )}
          {user && (
            <Link
              href="analysis"
              fontSize={{ md: "1.5rem", xs: "0.75rem" }}
              sx={{
                textDecoration: "none",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.3rem",
                paddingBottom: "0.3rem",
                // color: "#052A42",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.07)",
                  borderRadius: "0.5rem",
                },
              }}
            >
              <Typography sx={{ fontSize: { md: "1rem", xs: "0.75rem" } }}>
                Analysis
              </Typography>
            </Link>
          )}

          {!user ? (
            <Box fontSize={"2rem"} marginRight="2rem">
              <IconButton onClick={handleClick}>
                <AccountCircleIcon sx={{ fontSize: "3rem" }} />
                <ExpandMoreIcon style={{ color: "#052A42" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={GoogleLogin} href="/">
                  {" "}
                  <FcGoogle /> &nbsp; Sign In
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <Box marginRight="2rem">
                <IconButton onClick={handleClick}>
                  <img
                    src={user.photoURL || undefined}
                    alt="photo"
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                  <ExpandMoreIcon style={{ color: "#052A42" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={() => auth.signOut()}>Sign Out</MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Stack>
      </Box>
      {/* <Divider sx={{ background: "grey" }} /> */}
    </>
  );
};

export default Navbar;
