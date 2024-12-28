import React from "react";
import Grid from "@mui/material/Grid";
import CoachesCard from "./CoachesCard";
import { Paper } from "@mui/material";

const coaches = [
  {
    name: "Coach 1",
    image: "https://via.placeholder.com/150",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec ante in nulla efficitur lacinia. Nullam nec nisi nec arcu ultricies ultrices. Sed vitae metus auctor, ultricies lacus sit amet, tincidunt libero. Sed vitae metus auctor, ultricies lacus sit amet, tincidunt libero.",
  },
  {
    name: "Coach 2",
    image: "https://via.placeholder.com/150",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec ante in nulla efficitur lacinia. Nullam nec nisi nec arcu ultricies ultrices. Sed vitae metus auctor, ultricies lacus sit amet, tincidunt libero. Sed vitae metus auctor, ultricies lacus sit amet, tincidunt libero.",
  },
];

const CoachesPage = () => {
  return (
    <div>
      <h1>Coaches</h1>
      {/* to add some info and photo together */}

      {/* individual coach info */}
      {coaches.length === 0 ? (
        <p>No coaches available</p>
      ) : (
        coaches.map((coach, index) => (
          <Grid
            container
            spacing={3}
            key={index}
            direction={{ xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" }} // Column on small screens
            alignItems="center"
          >
            <Grid item xs={12} md={8}>
              <CoachesCard coach={coach} />
            </Grid>
            <Grid item xs={12} md={4}>
            <Paper elevation={3}>
              <img
                src={coach.image}
                alt={coach.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
                </Paper>
            </Grid>
          </Grid>
        ))
      )}
      {/* become a coach? join us
      Join us in the shadows where we stand vigilant. 
      Join us as we carry the duty that cannot be forsworn. 
      And should you perish, know that your sacrifice will not be forgotten. 
      And that one day we shall join you.
      */}
    </div>
  );
};

export default CoachesPage;
