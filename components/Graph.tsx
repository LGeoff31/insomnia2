import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { SleepEntry } from "../pages";
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
import { BarGraph } from "./BarGraph";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({
  dataEntries,
  target,
  fetchTarget,
}: {
  fetchTarget: () => Promise<void>;
  dataEntries: SleepEntry[];
  target: number;
}) => {
  const threshold = target;
  const dates = dataEntries?.map((entry) => {
    return entry.date;
  });

  const hours = dataEntries?.map((entry) => {
    return entry.hours;
  });

  const quality = dataEntries?.map((entry) => {
    return entry.quality;
  });

  const exercise = dataEntries?.map((entry) => {
    return entry.exercise;
  });

  const stress = dataEntries?.map((entry) => {
    return entry.stress;
  });

  const [targetSleep, setTargetSleep] = useState<number>(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [user] = useAuthState(auth);

  // useEffect(() => {
  //   // This effect will be triggered every time targetSleep changes
  //   window.location.reload();
  // }, [targetSleep]);
  const openAlert = () => {
    setAlertOpen(true);
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };
  const handleEnter = async () => {
    setAlertOpen(false);
    console.log(targetSleep, "FINAWFKMAWNFMAWF");
    const formData = {
      targetSleep: targetSleep,
      user_id: user?.uid,
    };
    const response = await fetch("/api/createTarget", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponse = await response.json();
    fetchTarget();
  };

  const options = {
    responsive: true,
    title: {
      display: true,

      text: "Insomnia",
      font: {
        size: 30,
        weight: "bold",
      },
      style: {
        background: "red",
      },
    },

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Analysis of Factors Affecting Sleep",
        color: "black",
        font: {
          size: 20, // Adjust the font size here
        },
      },
    },

    scale: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Hours",
        },
      },
    },
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Duration of Sleep",
        data: hours,
        backgroundColor: "#ed9200",
        borderColor: "#ed9200",
      },
      {
        label: "Quality of Sleep",
        data: quality,
        backgroundColor: "#00d126",
        borderColor: "#00d126",
      },
      {
        label: "Duration of Physical Exercise",
        data: exercise,
        backgroundColor: "rgb(53, 162, 235)",
        borderColor: "rgb(53, 162, 235)",
      },
      {
        label: "Stress Levels",
        data: stress,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Target Duration of Sleep",
        data: new Array(dates?.length).fill(threshold),
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderDash: [5, 5],
        borderWidth: 1,
      },
    ],
  };

  // useEffect(() => {
  //   // Reload the page
  //   window.location.reload();
  // }, [targetSleep]);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          // color: "#052A42",
          // marginTop: "1rem",
          // fontWeight: "400px",
          // fontSize: "0.75rem",
          background: "green",
          textTransform: "none",
          // marginLeft: "8rem",
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
          marginBottom: "2rem",
        }}
        onClick={openAlert}
      >
        Set a Sleep Goal
      </Button>
      <Dialog open={alertOpen} onClose={closeAlert}>
        <DialogTitle>Set Your Goal Number of Hours of Sleep</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            value={targetSleep}
            onChange={(e) => setTargetSleep(parseInt(e.target.value))}
            label="Ex. 8"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAlert}>Cancel</Button>
          <Button onClick={handleEnter}>Enter</Button>
        </DialogActions>
      </Dialog>
      <Grid container justifyContent="center">
        <Box
          sx={{
            width: { md: "80vw", xs: "100vw" },
            height: { md: "80vh", xs: "50%" },
            background: "#bedce8",
            padding: { md: "2rem", xs: "0rem" },
            m: "0 auto",
            display: "flex",
            justifyContent: "center",
            borderRadius: "1rem",
            boxShadow: "0px 0px 25px -6px rgba(0,0,0,0.65)",
            marginBottom: "3rem",
          }}
        >
          <Line options={options} data={data} />
        </Box>
        <BarGraph
          dates={dates}
          hours={hours}
          quality={quality}
          exercise={exercise}
          stress={stress}
        />
        {/* </Box> */}
      </Grid>
    </>
  );
};
export default Graph;
