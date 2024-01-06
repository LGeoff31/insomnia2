import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { SleepEntry } from "../pages";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const Statistics = ({ data }: { data: SleepEntry[] }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    option1: "Hours of Sleep",
    option2: "Quality of Sleep",
  });
  const [finalHours, setFinalHours] = useState<number>(0);
  const [finalQuality, setFinalQuality] = useState<number>(0);
  const [finalCovariance, setFinalCovariance] = useState<number>(0);
  const [finalDeviationFirst, setFinalDeviationFirst] = useState<number>(0);
  const [finalDeviationSecond, setFinalDeviationSecond] = useState<number>(0);
  const [finalCorrelation, setFinalCorrelation] = useState<number>(0);
  const [finalCorrelationString, setFinalCorrelationString] =
    useState<string>("");

  const handleOptionChange = (event: any, option: any) => {
    setSelectedOptions({ ...selectedOptions, [option]: event.target.value });
    console.log(selectedOptions);
  };

  function sum(numbers: number[]) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
      total += numbers[i];
    }
    return total;
  }
  const hoursArray: number[] = [];
  const qualityArray: number[] = [];
  const stressArray: number[] = [];
  const physicalArray: number[] = [];

  for (let entry of data) {
    hoursArray.push(entry.hours);
    qualityArray.push(entry.quality);
    stressArray.push(entry.stress);
    physicalArray.push(entry.exercise);
  }
  let meanHours = 0;
  let meanQuality = 0;
  let covariance = 0;
  let std_dev_hours = 0;
  let std_dev_quality = 0;
  let correlation = 0;

  function calc_statistics(array1: number[], array2: number[]) {
    meanHours = sum(array1) / array1.length;
    meanQuality = sum(array2) / array2.length;
    for (let i = 0; i < array1.length; i++) {
      covariance += (array1[i] - meanHours) * (array2[i] - meanQuality);
      std_dev_hours += (array1[i] - meanHours) ** 2;
      std_dev_quality += (array2[i] - meanQuality) ** 2;
    }
    covariance /= array1.length - 1;
    std_dev_hours = (std_dev_hours / (array1.length - 1)) ** 0.5;
    std_dev_quality = (std_dev_quality / (array1.length - 1)) ** 0.5;
    //correlations
    correlation = covariance / (std_dev_hours * std_dev_quality);
    let correlationString = "";
    if (correlation < 0) {
      correlation *= -1; //add poisitve negative
    }
    if (correlation > 0.7) {
      setFinalCorrelationString("Strong");
    } else if (0.5 < correlation && correlation <= 0.7) {
      setFinalCorrelationString("Moderate");
    } else if (0.3 < correlation && correlation <= 0.5) {
      setFinalCorrelationString("Weak");
    } else {
      setFinalCorrelationString("Very Weak");
    }
  }
  const [open, setOpen] = useState(false);

  const handleClickStatistics = () => {
    if (selectedOptions.option1 === selectedOptions.option2) {
      window.alert("Options must be different");
    } else {
      console.log(
        "BOTH INPUTS VALIDATED",
        selectedOptions.option1,
        selectedOptions.option2
      );
      const concatenatedOptions =
        selectedOptions.option1 + selectedOptions.option2;
      console.log("concatenated is", concatenatedOptions);
      switch (concatenatedOptions) {
        //quality
        case "Hours of SleepQuality of Sleep":
          calc_statistics(hoursArray, qualityArray);
          break;
        case "Quality of SleepHours of Sleep":
          calc_statistics(hoursArray, qualityArray);
          break;

        case "Quality of SleepStress Level":
          calc_statistics(stressArray, qualityArray);
          break;
        case "Stress LevelQuality of Sleep":
          calc_statistics(stressArray, qualityArray);
          break;

        case "Stress LevelPhysical Exercise":
          calc_statistics(stressArray, physicalArray);
          break;
        case "Physical ExerciseStress Level":
          calc_statistics(stressArray, qualityArray);
          break;
        //hours
        case "Hours of SleepStress Level":
          calc_statistics(stressArray, hoursArray);
          break;
        case "Stress LevelHours of Sleep":
          calc_statistics(stressArray, hoursArray);
          break;

        case "Hours of SleepPhysical Exercise":
          calc_statistics(hoursArray, physicalArray);
          break;
        case "Physical ExerciseHours of Sleep":
          calc_statistics(hoursArray, physicalArray);
          break;

        //stress
        case "Stress LevelPhysical Exercise":
          calc_statistics(stressArray, physicalArray);
          break;
        case "Physical ExerciseStress Level":
          calc_statistics(stressArray, physicalArray);
          break;

        //default
        default:
          calc_statistics(hoursArray, qualityArray);
          break;
      }
      setFinalHours(meanHours);
      setFinalQuality(meanQuality);
      setFinalCovariance(covariance);
      setFinalDeviationFirst(std_dev_hours);
      setFinalDeviationSecond(std_dev_quality);
      setFinalCorrelation(correlation);
      setOpen(true);
      //
    }
  };
  const handleClickStatisticsStart = () => {
    calc_statistics(hoursArray, qualityArray);
    setFinalHours(meanHours);
    setFinalQuality(meanQuality);
    setFinalCovariance(covariance);
    setFinalDeviationFirst(std_dev_hours);
    setFinalDeviationSecond(std_dev_quality);
    setFinalCorrelation(correlation);
  };
  useEffect(() => {
    if (data.length > 0) {
      for (let entry of data) {
        hoursArray.push(entry.hours);
        qualityArray.push(entry.quality);
        stressArray.push(entry.stress);
        physicalArray.push(entry.exercise);
      }
    }
    handleClickStatisticsStart();
  }, [data]);

  const handleCloseStatistics = () => {
    setOpen(false);
  };

  const getColorForStrength = (strength: string) => {
    switch (strength) {
      case "Strong":
        return "#008000";
      case "Moderate":
        return "#FFA500";
      case "Weak":
        return "#FFD700";
      case "Very Weak":
        return "#FF6347";
      default:
        return "black";
    }
  };

  return (
    <Grid sx={{ background: "#E1F6FF" }}>
      <Typography
        paddingTop="1rem"
        display="flex"
        variant="h3"
        justifyContent={"center"}
      >
        Statistics
      </Typography>
      <Divider
        sx={{
          width: "12rem",
          margin: "0 auto",
        }}
      />
      <Grid
        container
        direction={{ md: "row", xs: "column" }}
        justifyContent={"center"}
        alignItems={"center"}
        gap="2rem"
        marginBottom="4rem"
      >
        <Box marginLeft="4rem">
          <Typography
            marginTop="1rem"
            variant="body2"
            fontSize={{ md: "1.5rem", xs: "1rem" }}
          >
            Choose Two Measures to Calculate the Correlation!
          </Typography>
          <Stack direction="column" display="flex" justifyContent={"center"}>
            <Box margin="0 auto" paddingTop="1rem">
              <Select
                value={selectedOptions.option1}
                onChange={(e) => handleOptionChange(e, "option1")}
              >
                <MenuItem value="">Select Option 1</MenuItem>
                <MenuItem value="Quality of Sleep">Quality of Sleep</MenuItem>
                <MenuItem value="Hours of Sleep">Hours of Sleep</MenuItem>
                <MenuItem value="Stress Level">Stress Level</MenuItem>
                <MenuItem value="Physical Exercise">Physical Exercise</MenuItem>
              </Select>
              <Select
                value={selectedOptions.option2}
                onChange={(e) => handleOptionChange(e, "option2")}
              >
                <MenuItem value="">Select Option 2</MenuItem>
                <MenuItem value="Quality of Sleep">Quality of Sleep</MenuItem>
                <MenuItem value="Hours of Sleep">Hours of Sleep</MenuItem>
                <MenuItem value="Stress Level">Stress Level</MenuItem>
                <MenuItem value="Physical Exercise">Physical Exercise</MenuItem>
              </Select>
            </Box>
            <Box margin="0 auto" paddingTop="1rem">
              <Button
                variant="contained"
                onClick={handleClickStatistics}
                sx={{ textTransform: "none" }}
              >
                Calculate Correlation
              </Button>
            </Box>
          </Stack>
          <Dialog open={open} onClose={handleCloseStatistics}>
            <DialogTitle sx={{ background: "#bedce8" }}>
              {selectedOptions.option1}{" "}
              <span style={{ fontWeight: "bold" }}>Vs </span>{" "}
              {selectedOptions.option2}
            </DialogTitle>
            <DialogContent sx={{ background: "#bedce8" }}>
              <DialogContentText>
                <Typography>
                  Mean Hours of Sleep: &nbsp;
                  <span style={{ fontWeight: "bold" }}>
                    {finalHours.toFixed(1)} Hours
                  </span>
                  &nbsp;
                </Typography>
                <Typography>
                  Mean Quality of Sleep: &nbsp;
                  <span style={{ fontWeight: "bold" }}>
                    {finalQuality.toFixed(1)}/10
                  </span>
                </Typography>
                <Typography>
                  Covariance: &nbsp;
                  <span style={{ fontWeight: "bold" }}>
                    {finalCovariance.toFixed(1)}
                  </span>
                </Typography>
                <Typography>
                  Standard deviation hours: &nbsp;
                  <span style={{ fontWeight: "bold" }}>
                    {finalDeviationFirst.toFixed(1)}
                  </span>
                </Typography>
                <Typography>
                  Standard deviation Quality: &nbsp;
                  <span style={{ fontWeight: "bold" }}>
                    {finalDeviationSecond.toFixed(1)}
                  </span>
                </Typography>
                <Typography>
                  Correlation: &nbsp;
                  <span style={{ fontWeight: "bold" }}>
                    {finalCorrelation.toFixed(2)}
                  </span>
                </Typography>
                <Typography>
                  Correlation: &nbsp;
                  <span
                    style={{
                      fontWeight: "bold",
                      color: getColorForStrength(finalCorrelationString),
                    }}
                  >
                    {finalCorrelationString}
                  </span>
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ background: "#bedce8" }}>
              <Button
                onClick={handleCloseStatistics}
                variant="contained"
                autoFocus
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        {/* <Box
          width="12rem"
          height="12rem"
          borderRadius="8px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          padding="2rem"
          marginRight="4rem"
          sx={{ background: "#faeda5" }}
        >
          <Typography fontWeight="bold">Note</Typography>
          <Typography variant="body1" color="#052A42">
            Click the Icons from the Legend to disable the line from the chart
          </Typography>
        </Box> */}
      </Grid>
    </Grid>
  );
};

export default Statistics;
