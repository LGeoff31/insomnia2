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
} from "@mui/material";
import React, { useState } from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Form = ({ fetchData }: { fetchData: () => Promise<void> }) => {
  const [date, setDate] = useState("");

  const [hours, setHours] = useState(5);
  const [quality, setQuality] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [stress, setStress] = useState(0);

  const [description, setDescription] = useState("");
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [targetSleep, setTargetSleep] = useState<number>(0);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleHourChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue == "number") {
      setHours(newValue);
    }
    console.log(newValue);
  };

  const handleQualityChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue == "number") {
      setQuality(newValue);
    }
    console.log(newValue);
  };
  const handleExerciseChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue == "number") {
      setExercise(newValue);
    }
    console.log(newValue);
  };
  const handleStressChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue == "number") {
      setStress(newValue);
    }
    console.log(newValue);
  };
  const handleSubmit = async (event: any) => {
    console.log("reached");
    event?.preventDefault();
    const formData = {
      date: date,
      hours: hours,
      quality: quality,
      exercise: exercise,
      stress: stress,
      description: description,
      user_id: user?.uid,
    };
    console.log("Form Data", formData);

    const response = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponse = await response.json();
    setOpen(true);
    console.log(dataResponse);

    fetchData();

    setDate("");
    setHours(0);
    setQuality(0);
    setStress(0);
    setExercise(0);

    setDescription("");
  };
  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid
      container
      direction="row"
      gap={"5rem"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        border="2px solid #d0e8f2"
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        padding="2rem"
        sx={{ background: "#d0e8f2", boxShadow: "20" }}
      >
        <Typography variant="h2" fontWeight="400" color="#008bE7">
          Insomnia
        </Typography>
        <Divider />
        <Typography
          fontSize={{ md: "2rem", xs: "1.5rem" }}
          marginTop="1rem"
          marginBottom="1rem"
        >
          Record your sleep last night!
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack direction="column">
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                background: "#E1F6FF",
                width: "100%",
                marginBottom: "1rem",
                fontSize: "16px",
                color: "#052A42",
              }}
            />
            <Typography variant="body1" paddingTop="1rem" color="#052A42">
              Hours of Sleep
            </Typography>
            <Slider
              min={5}
              max={12}
              step={0.25}
              value={hours}
              onChange={handleHourChange}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: "0h" },
                { value: 3, label: "3h" },
                { value: 6, label: "6h" },
                { value: 9, label: "9h" },
                { value: 12, label: "12h" },
              ]}
            />
            <Typography variant="body1" paddingTop="1rem" color="#052A42">
              Physical Exercise
            </Typography>

            <Slider
              min={0}
              max={10}
              value={exercise}
              onChange={handleExerciseChange}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: "0" },
                { value: 5, label: "5" },
                { value: 10, label: "10" },
              ]}
            />
            <Typography variant="body1" paddingTop="1rem" color="#052A42">
              Quality of Sleep
            </Typography>

            <Slider
              min={0}
              max={10}
              value={quality}
              onChange={handleQualityChange}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: "0" },
                { value: 5, label: "5" },
                { value: 10, label: "10" },
              ]}
            />

            <Typography variant="body1" paddingTop="1rem" color="#052A42">
              Stress Levels
            </Typography>

            <Slider
              min={0}
              max={10}
              value={stress}
              onChange={handleStressChange}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: "0" },
                { value: 5, label: "5" },
                { value: 10, label: "10" },
              ]}
            />

            <TextField
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              label="Note"
              variant="outlined"
              placeholder="Ex. I slept with my bear last night"
              value={description}
              inputProps={{ maxLength: 50 }}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ fontWeight: "400px", textTransform: "none" }}
            >
              Submit
            </Button>

            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleCloseToast}
            >
              <Alert
                onClose={handleCloseToast}
                severity="success"
                sx={{ width: "100%" }}
              >
                Data Successfully Added!
              </Alert>
            </Snackbar>
          </Stack>
        </form>
      </Box>

      {/* <Box
        width="13rem"
        height="10%"
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        padding="1.5rem"
        sx={{ background: "#faeda5", display: { md: "block", xs: "none" } }}
      >
        <Typography fontWeight="bold">Note</Typography>
        <Typography variant="body1" color="#052A42">
          To analyze the data, click on the Analysis Page at the top
        </Typography> */}
      {/* <Button
          sx={{
            // color: "#052A42",
            marginTop: "1rem",
            fontWeight: "400px",
            fontSize: "0.75rem",
            textTransform: "none",
          }}
          variant="contained"
          onClick={openAlert}
        >
          Set a Sleep Goal
        </Button> */}
      {/* </Box> */}
    </Grid>
  );
};

export default Form;
