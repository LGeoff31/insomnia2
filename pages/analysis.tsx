import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Graph from "../components/Graph";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import Statistics from "../components/Statistics";
import { Box, Stack } from "@mui/material";

export interface SleepEntry {
  _id: string;
  date: string;
  hours: number;
  quality: number;
  stress: number;
  exercise: number;
  description: string;
}

const Analysis = () => {
  const [data, setData] = useState<SleepEntry[]>([]);
  const [user] = useAuthState(auth);
  const [target, setTarget] = useState<number>(0);

  const fetchTarget = async () => {
    const response = await fetch("/api/getTarget", {
      method: "POST",
      body: JSON.stringify({ user_id: user?.uid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const targetEntry = await response.json();
    const entries = targetEntry.dataEntry;
    setTarget(entries[entries?.length - 1]?.targetSleep);
  };
  const fetchData = async () => {
    const response = await fetch("/api/get", {
      method: "POST",
      body: JSON.stringify({ user_id: user?.uid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataEntry = await response.json();
    console.log(dataEntry);
    setData(dataEntry.dataEntry);
  };
  useEffect(() => {
    fetchData();
    fetchTarget();
  }, [user]);

  return (
    <Box sx={{ background: "#E1F6FF" }}>
      <Navbar />
      <Statistics data={data} />

      <Graph target={target} dataEntries={data} fetchTarget={fetchTarget} />
    </Box>
  );
};

export default Analysis;
