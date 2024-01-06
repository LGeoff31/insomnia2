import React, { useState, useEffect } from "react";
import Display from "../components/Display";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { SleepEntry } from ".";
import Navbar from "../components/Navbar";
import { Grid } from "@mui/material";

const FormData = () => {
  const [data, setData] = useState<SleepEntry[]>([]);
  const [user] = useAuthState(auth);
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
  }, [user]);
  return (
    <Grid sx={{ background: "#E1F6FF" }}>
      <Navbar />
      <Display data={data} fetchData={fetchData} />;
    </Grid>
  );
};

export default FormData;
