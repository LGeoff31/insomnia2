import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  parseISO,
} from "date-fns";
import { Box, Divider } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const option1 = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      color: "black",
      display: true,
      text: "Sleep Hours: Days of the week",
      font: {
        size: 20, // Adjust the font size here
      },
    },
  },
  scales: {
    x: {
      min: 0,
      max: 12,
      title: {
        display: true,
        text: "Hours",
      },
    },
  },
};
export const option2 = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 4,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      color: "black",
      display: true,
      text: "Factors of Sleep: Days of the week",
      font: {
        size: 20, // Adjust the font size here
      },
    },
  },
  scales: {
    x: {
      min: 0,
      max: 10,
    },
    y: {
      // width:10,
    },
  },
};

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const dayOfWeek = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "EEEE");
};

export function BarGraph({
  dates,
  hours,
  quality,
  exercise,
  stress,
}: {
  dates: string[];
  hours: number[];
  quality: number[];
  exercise: number[];
  stress: number[];
}) {
  if (!dates || !hours || !quality) {
    return <div>Loading...</div>;
  }
  let hoursPerDay = [0, 0, 0, 0, 0, 0, 0];
  let qualityPerDay = [0, 0, 0, 0, 0, 0, 0];
  let exercisePerDay = [0, 0, 0, 0, 0, 0, 0];
  let stressPerDay = [0, 0, 0, 0, 0, 0, 0];

  let frequencyPerDay = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < dates.length; i++) {
    let day = dayOfWeek(dates[i]);

    switch (day) {
      case "Monday":
        hoursPerDay[0] += hours[i];
        qualityPerDay[0] += quality[i];
        exercisePerDay[0] += exercise[i];
        stressPerDay[0] += stress[i];
        frequencyPerDay[0]++;
        break;
      case "Tuesday":
        hoursPerDay[1] += hours[i];
        qualityPerDay[1] += quality[i];
        exercisePerDay[1] += exercise[i];
        stressPerDay[1] += stress[i];
        frequencyPerDay[1]++;
        break;
      case "Wednesday":
        hoursPerDay[2] += hours[i];
        qualityPerDay[2] += quality[i];
        exercisePerDay[2] += exercise[i];
        stressPerDay[2] += stress[i];
        frequencyPerDay[2]++;
        break;
      case "Thursday":
        hoursPerDay[3] += hours[i];
        qualityPerDay[3] += quality[i];
        exercisePerDay[3] += exercise[i];
        stressPerDay[3] += stress[i];
        frequencyPerDay[3]++;
        break;
      case "Friday":
        hoursPerDay[4] += hours[i];
        qualityPerDay[4] += quality[i];
        exercisePerDay[4] += exercise[i];
        stressPerDay[4] += stress[i];
        frequencyPerDay[4]++;
        break;
      case "Saturday":
        hoursPerDay[5] += hours[i];
        qualityPerDay[5] += quality[i];
        exercisePerDay[5] += exercise[i];
        stressPerDay[5] += stress[i];
        frequencyPerDay[5]++;
        break;
      case "Sunday":
        hoursPerDay[6] += hours[i];
        qualityPerDay[6] += quality[i];
        exercisePerDay[6] += exercise[i];
        stressPerDay[6] += stress[i];
        frequencyPerDay[6]++;
        break;
      default:
        break;
    }
  }
  for (let j = 0; j < hoursPerDay.length; j++) {
    if (hoursPerDay[j] != 0) {
      hoursPerDay[j] /= frequencyPerDay[j];
    }
    if (qualityPerDay[j] != 0) {
      qualityPerDay[j] /= frequencyPerDay[j];
    }
    if (exercisePerDay[j] != 0) {
      exercisePerDay[j] /= frequencyPerDay[j];
    }
    if (stressPerDay[j] != 0) {
      stressPerDay[j] /= frequencyPerDay[j];
    }
  }
  const data1 = {
    labels,
    datasets: [
      {
        label: "Hours Sleep",
        data: hoursPerDay,
        borderColor: "#ed9200",
        backgroundColor: "#ed9200",
      },
    ],
  };
  const data2 = {
    labels,
    datasets: [
      {
        label: "Quality Sleep",
        data: qualityPerDay,
        borderColor: "#00d126",
        backgroundColor: "#00d126",
        // barPercentage: 1.0, // Set to 1.0 for full width
        // categoryPercentage: 1.0, // Set to 1.0 for full width
      },
      {
        label: "Exercise",
        data: exercisePerDay,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235)",
        // barPercentage: 1.0, // Set to 1.0 for full width
        // categoryPercentage: 1.0, // Set to 1.0 for full width
      },
      {
        label: "Stress",
        data: stressPerDay,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
        // barPercentage: 1.0, // Set to 1.0 for full width
        // categoryPercentage: 1.0, // Set to 1.0 for full width
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
      <Box sx={{ background: "#bedce8" }}>
        <Bar style={{ marginBottom: "2rem" }} options={option2} data={data2} />
        <Divider />
        <Bar style={{ marginTop: "2rem" }} options={option1} data={data1} />
      </Box>
    </Box>
  );
}
