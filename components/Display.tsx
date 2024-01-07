import {
  Alert,
  Box,
  Button,
  Divider,
  Hidden,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SleepEntry } from "../pages";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { CiTrash } from "react-icons/ci";
import { format, parseISO } from "date-fns";

import { GiNightSleep } from "react-icons/gi";
import { RiRunFill } from "react-icons/ri";
import { FaRegFaceFrownOpen } from "react-icons/fa6";
import { CiFaceSmile } from "react-icons/ci";
import { MdOutlineDescription } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
const Display = ({
  data,
  fetchData,
}: {
  data: SleepEntry[];
  fetchData: () => Promise<void>;
}) => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const handleDelete = async (id: string) => {
    setOpen(true);
    const response = await fetch(`/api/delete`, {
      method: "POST",
      body: JSON.stringify({
        id,
        user_id: user?.uid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponse = await response.json();
    console.log(dataResponse);
    fetchData();
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
    <Stack
      // direction={{ md: "row", sm: "column" }}
      // alignItems={"center"}
      // gap="3rem"
      // justifyContent={"center"}
      paddingTop="2rem"
      height="100vh"
    >
      <Box
        border="2px solid #d0e8f2"
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        padding={{ md: "2rem", xs: "0rem" }}
        sx={{ background: "#d0e8f2", boxShadow: "20" }}
      >
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h3"
            // fontFamily={"bold"}
            color="#008bE7"
            fontSize={{ md: "3rem", xs: "2rem" }}
          >
            &nbsp;Form Data
          </Typography>
          <Typography marginRight={{ md: "0rem", xs: "1rem" }}>
            Total Entries: {data?.length}
          </Typography>
        </Stack>
        <Divider />
        <TableContainer
          style={{ maxHeight: 625, background: "", marginTop: "1rem" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    background: "#d0e8f2",
                    color: "#052A42",
                    // fontWeight: "bold",
                    // fontSize: "1rem",
                  }}
                >
                  <Typography fontSize={{ md: "2rem", xs: "1.5rem" }}>
                    {/* Date */}
                    <CiCalendarDate />
                  </Typography>
                </TableCell>
                <TableCell
                  style={{
                    background: "#d0e8f2",
                    color: "#052A42",
                    // fontWeight: "bold",
                    // fontSize: "1rem",
                  }}
                >
                  <Typography fontSize={{ md: "2rem", xs: "1.5rem" }}>
                    {/* Sleep */}
                    <GiNightSleep />
                  </Typography>
                </TableCell>
                <TableCell
                  style={{
                    background: "#d0e8f2",
                    color: "#052A42",
                    // fontWeight: "bold",
                    // fontSize: "1rem",
                  }}
                >
                  <Typography fontSize={{ md: "2rem", xs: "1.5rem" }}>
                    {/* Exercise */}
                    <RiRunFill />
                  </Typography>
                </TableCell>
                <TableCell
                  style={{
                    background: "#d0e8f2",
                    color: "#052A42",
                    // fontWeight: "bold",
                    // fontSize: "1rem",
                  }}
                >
                  <Typography fontSize={{ md: "2rem", xs: "1.5rem" }}>
                    {/* Stress */}
                    <FaRegFaceFrownOpen />
                  </Typography>
                </TableCell>
                <TableCell
                  style={{
                    background: "#d0e8f2",
                    color: "#052A42",
                    // fontWeight: "bold",
                    // fontSize: "1rem",
                  }}
                >
                  <Typography fontSize={{ md: "2rem", xs: "1.5rem" }}>
                    {/* Quality */}
                    <CiFaceSmile />
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    background: "#d0e8f2",
                    color: "#052A42",
                    // fontWeight: "bold",

                    display: { md: "table-cell", xs: "none" },
                  }}
                >
                  <Typography fontSize={{ md: "2rem", xs: "0.5rem" }}>
                    {/* Description */}
                    <MdOutlineDescription />
                  </Typography>
                </TableCell>
                <TableCell
                  style={{
                    background: "#d0e8f2",
                    color: "#052A42",

                    fontSize: "1rem",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      color: "#052A42",
                      fontSize: { md: "1rem", xs: "0.75rem" },
                    }}
                  >
                    {format(parseISO(entry.date), "MMM do, yyyy")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#052A42",
                      fontSize: { md: "1rem", xs: "0.75rem" },
                    }}
                  >
                    {entry.hours} Hours
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#052A42",
                      fontSize: { md: "1rem", xs: "0.75rem" },
                    }}
                  >
                    {entry.exercise}/10
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#052A42",
                      fontSize: { md: "1rem", xs: "0.75rem" },
                    }}
                  >
                    {entry.stress}/10
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#052A42",
                      fontSize: { md: "1rem", xs: "0.75rem" },
                    }}
                  >
                    {entry.quality}/10
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#052A42",
                      fontSize: "1rem",
                      display: { md: "table-cell", xs: "none" },
                    }}
                  >
                    {!entry.description ? "N/A" : entry.description}
                  </TableCell>
                  <TableCell>
                    <Button
                      // variant="contained"
                      // color="error"
                      sx={{
                        color: "red",
                        // padding: "0.2rem",
                        textTransform: "none",
                        fontSize: { md: "2rem", xs: "0.75rem" },
                      }}
                      onClick={() => handleDelete(entry._id)}
                    >
                      <CiTrash />
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
                        Data Successfully Deleted!
                      </Alert>
                    </Snackbar>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
};

export default Display;
