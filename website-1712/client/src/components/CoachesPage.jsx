import React from "react";
import Grid from "@mui/material/Grid";
import CoachesCard from "./CoachesCard";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,

    }
  }
}


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
      <h1 aria-label={'Browse Coaches'}>Coaches</h1>
      {/* photo together */}
      {coaches.length === 0 ? (
        <p>No coaches available</p>
      ) : (

        (coaches.map((coach, index) => (
          <motion.div
            variants={container}
            initial='hidden'
            animate='show'>
            <Grid
              container
              spacing={3}
              key={index}
              direction={{
                xs: "column",
                md: index % 2 === 0 ? "row" : "row-reverse",
              }}
              alignItems="center"
              aria-label={`Coach ${index + 1}`}
            >
              <Grid item xs={12} md={8}>
                <CoachesCard
                  coach={coach}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                  <Paper elevation={3} role="img">
                    <img
                      src={coach.image}
                      alt={coach.name}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </Paper>
                </Grid>
            </Grid>
          </motion.div>
        )))

      )}
    </div>
  );
};

export default CoachesPage;
