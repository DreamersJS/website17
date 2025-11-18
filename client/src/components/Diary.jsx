import React, { useState } from "react";
import { Container, Grid, Card, CardContent, Typography, TextField, Button, MenuItem, Slider, IconButton, Snackbar, Alert } from "@mui/material";
import { Delete } from "@mui/icons-material";
import useScreenSize from "../hooks/useScreenSize";
import ResponsiveComponent from "./hoc/ResponsiveComponent";
import { saveDiary } from "../service/service-user";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userAtom";

const Diary = () => {
  const { width, height } = useScreenSize();
  const user = useRecoilValue(userState);

  if (width === null || height === null) {
    return <div>Loading...</div>;
  }

  const [meals, setMeals] = useState([
    { meal: "Breakfast", grams: 150, type: "Boiled", notes: "High fiber" },
    { meal: "Lunch", grams: 200, type: "Grilled", notes: "Low fat" },
    { meal: "Dinner", grams: 180, type: "Steamed", notes: "High protein" },
  ]);

  const [waterIntake, setWaterIntake] = useState(2);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [sleepQuality, setSleepQuality] = useState(4);
  const [mood, setMood] = useState(5);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const cookingMethods = ["Boiled", "Steamed", "Grilled", "Baked", "Raw", "Fried"];

  const handleMealChange = (index, field, value) => {
    const updatedMeals = [...meals];
    updatedMeals[index][field] = value;
    setMeals(updatedMeals);
  };

  const handleAddMeal = () => {
    setMeals([...meals, { meal: "", grams: "", type: "Boiled", notes: "" }]);
  };

  const handleRemoveMeal = (index) => {
    const updatedMeals = meals.filter((_, i) => i !== index);
    setMeals(updatedMeals);
  };

  const validateMeals = () => {
    for (let meal of meals) {
      if (!meal.meal.trim()) return "Meal name cannot be empty!";
      if (isNaN(meal.grams) || meal.grams <= 0) return "Grams must be a positive number!";
    }
    return null;
  };

  const handleSaveDiary = () => {
    const errorMessage = validateMeals();
    if (errorMessage) {
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
      return;
    }
    const userId = user._id;
    saveDiary({ meals, waterIntake, energyLevel, sleepQuality, mood, userId });

    console.log("Saved Diary:", { meals, waterIntake, energyLevel, sleepQuality, mood });
    setSnackbarMessage("Diary saved successfully!");
    setOpenSnackbar(true);
  };

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Feeding Habits */}
          <ResponsiveComponent>
            {({ width }) => {
              const renderMeals = (isDesktop) =>
                meals.map((meal, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                    <Grid item xs={isDesktop ? 3 : 12}>
                      <TextField
                        fullWidth
                        label="Meal"
                        value={meal.meal}
                        onChange={(e) => handleMealChange(index, "meal", e.target.value)}
                        error={!meal.meal.trim()}
                        helperText={!meal.meal.trim() ? "Meal cannot be empty" : ""}
                      />
                    </Grid>
                    <Grid item xs={isDesktop ? 2 : 12}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Grams"
                        value={meal.grams}
                        onChange={(e) => handleMealChange(index, "grams", e.target.value)}
                        error={isNaN(meal.grams) || meal.grams <= 0}
                        helperText={
                          isNaN(meal.grams) || meal.grams <= 0 ? "Enter a positive number" : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={isDesktop ? 3 : 12}>
                      <TextField
                        select
                        fullWidth
                        label="Cooking Method"
                        value={meal.type}
                        onChange={(e) => handleMealChange(index, "type", e.target.value)}
                      >
                        {cookingMethods.map((method, idx) => (
                          <MenuItem key={idx} value={method}>
                            {method}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={isDesktop ? 3 : 12}>
                      <TextField
                        fullWidth
                        label="Notes"
                        value={meal.notes}
                        onChange={(e) => handleMealChange(index, "notes", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={1} display="flex" alignItems="center">
                      <IconButton color="error" onClick={() => handleRemoveMeal(index)}>
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                ));

              return (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Feeding Habits
                      </Typography>
                      {renderMeals(width > 600)}
                      <Button variant="contained" color="primary" onClick={handleAddMeal} sx={{
                        color: "#fff",
                        padding: '10px',
                        backgroundColor: '#177F2E',
                        '&:hover': { backgroundColor: '#0b4017' }
                      }}>
                        Add Meal
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            }}
          </ResponsiveComponent>

          {/* Water Intake */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Water Intake</Typography>
                <Typography>{waterIntake} Liters</Typography>
                <Slider
                  value={waterIntake}
                  onChange={(e, newValue) => setWaterIntake(newValue)}
                  min={0}
                  max={5}
                  step={0.5}
                  marks
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Health Improvements */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Health Improvements</Typography>
                <Typography>Energy Level</Typography>
                <Slider value={energyLevel} onChange={(e, v) => setEnergyLevel(v)} min={1} max={5} />
                <Typography>Sleep Quality</Typography>
                <Slider value={sleepQuality} onChange={(e, v) => setSleepQuality(v)} min={1} max={5} />
                <Typography>Mood</Typography>
                <Slider value={mood} onChange={(e, v) => setMood(v)} min={1} max={5} />
              </CardContent>
            </Card>
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={handleSaveDiary}>
              Save Diary
            </Button>
          </Grid>
        </Grid>

        {/* Snackbar Notification */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Diary;
