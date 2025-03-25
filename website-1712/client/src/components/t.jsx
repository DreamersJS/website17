<>
    <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
            {/* Feeding Habits */}
            <ResponsiveComponent>
                {
                    ({ width }) => {
                        if (width > 600) {
                            return (
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Feeding Habits</Typography>
                                            {meals.map((meal, index) => (
                                                <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                                                    <Grid item xs={3}>
                                                        <TextField
                                                            fullWidth
                                                            label="Meal"
                                                            value={meal.meal}
                                                            onChange={(e) => handleMealChange(index, "meal", e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <TextField
                                                            fullWidth
                                                            type="number"
                                                            label="Grams"
                                                            value={meal.grams}
                                                            onChange={(e) => handleMealChange(index, "grams", e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
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
                                                    <Grid item xs={4}>
                                                        <TextField
                                                            fullWidth
                                                            label="Notes"
                                                            value={meal.notes}
                                                            onChange={(e) => handleMealChange(index, "notes", e.target.value)}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Button variant="contained" color="primary" onClick={handleAddMeal}>
                                                Add Meal
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>);
                        } else {
                            return (
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Feeding Habits</Typography>
                                            {meals.map((meal, index) => (
                                                <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Meal"
                                                            value={meal.meal}
                                                            onChange={(e) => handleMealChange(index, "meal", e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            type="number"
                                                            label="Grams"
                                                            value={meal.grams}
                                                            onChange={(e) => handleMealChange(index, "grams", e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
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
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Notes"
                                                            value={meal.notes}
                                                            onChange={(e) => handleMealChange(index, "notes", e.target.value)}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Button variant="contained" color="primary" onClick={handleAddMeal}>
                                                Add Meal
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>)
                        }
                    }
                }
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
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSaveDiary}
                >
                    Save Diary
                </Button>
            </Grid>
        </Grid>
    </Container>

</>