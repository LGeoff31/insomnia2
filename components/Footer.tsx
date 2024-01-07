import React from "react";
import {
  Alert,
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
  TextField,
  Typography,
  Link,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from "@mui/icons-material/Web";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Grid container direction="column" paddingTop="4rem" paddingBottom="4rem">
      <Typography margin="0 auto" paddingBottom="1rem" fontSize="1rem">
        Made by Geoffrey Lee
      </Typography>
      <Stack direction="row" margin="0 auto" gap="1rem">
        <Link
          href="https://github.com/LGeoff31/insomnia2"
          target="_blank"
          sx={{
            color: "black",
            textDecoration: "none",

            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          <GitHubIcon style={{ fontSize: "2rem" }} />
        </Link>
        <Link
          target="_blank"
          href="http://geoffreylee.me/"
          sx={{
            color: "black",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          <WebIcon style={{ fontSize: "2rem" }} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/lgeoff31/"
          target="_blank"
          sx={{
            color: "black",
            textDecoration: "none",

            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          <LinkedInIcon style={{ fontSize: "2rem" }} />
        </Link>
      </Stack>
    </Grid>
  );
};

export default Footer;
