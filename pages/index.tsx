import { Box, Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Form from "../components/Form";
import Display from "../components/Display";
import React, { useEffect, useState } from "react";
import Graph from "../components/Graph";
import { LineChart } from "@mui/x-charts/LineChart";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import HomePage from "../components/Homepage";

export interface SleepEntry {
  _id: string;
  date: string;
  hours: number;
  quality: number;
  stress: number;
  exercise: number;
  description: string;
}

export default function Home() {
  return (
    <Grid sx={{ background: "#E1F6FF" }}>
      <title>Insomnia</title>
      <HomePage />
    </Grid>
  );
}
