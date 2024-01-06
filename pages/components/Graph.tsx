import React from "react";
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
import { SleepEntry } from "..";
import { Box, Stack, Typography } from "@mui/material";
import { BarGraph } from "./BarGraph";

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
}: {
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
        text: "Data Analysis",
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

  return (
    <Box
      sx={{
        width: { md: "80vw", xs: "100vw" },
        height: "100%",
        background: "#bedce8",
        padding: { md: "2rem", xs: "0rem" },
        m: "0 auto",
        borderRadius: "1rem",
        boxShadow: "0px 0px 25px -6px rgba(0,0,0,0.65)",
      }}
    >
      <Line options={options} data={data} />

      <BarGraph
        dates={dates}
        hours={hours}
        quality={quality}
        exercise={exercise}
        stress={stress}
      />
    </Box>
  );
};
export default Graph;
