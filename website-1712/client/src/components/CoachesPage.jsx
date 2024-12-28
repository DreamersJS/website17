import React from "react";
import Grid from "@mui/material/Grid";
import CoachesCard from "./CoachesCard";

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
      {coaches.length === 0 ? (
        <p>No coaches available</p>
      ) : (
        coaches.map((coach, index) => (
          <Grid
            container
            spacing={3}
            key={index}
            direction={index % 2 === 0 ? "row" : "row-reverse"} // Reverse row direction for every second coach
            alignItems="center"
          >
            <Grid item xs={8}>
              <CoachesCard coach={coach} />
            </Grid>
            <Grid item xs={4}>
              <img
                src={coach.image}
                alt={coach.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Grid>
          </Grid>
        ))
      )}
    </div>
  );
};

export default CoachesPage;
