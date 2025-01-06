import React from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import TestimonialCard from './TestimonialCard';

// Let ppl write & submit testimonials?
const testimonials = [
  {
    name: "John Doe",
    photoBefore: "https://via.placeholder.com/150", 
    photoAfter: "https://via.placeholder.com/150",
    text: "This product has transformed my daily routine! It's simple, effective, and reliable.",
    role: "Software Engineer",
  },
  {
    name: "Jane Smith",
    photoBefore: "https://via.placeholder.com/150", 
    photoAfter: "https://via.placeholder.com/150",
    text: "I’ve never felt better. The fitness plans are personalized and easy to follow.",
    role: "Fitness Enthusiast",
  },
  {
    name: "Michael Lee",
    photoBefore: "https://via.placeholder.com/150", 
    photoAfter: "https://via.placeholder.com/150",
    text: "Amazing customer service and high-quality products. Highly recommend!",
    role: "Business Owner",
  }
];

const Testimonials = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 8 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 5 }}>
        <Typography variant="h3" fontWeight="bold">What Our Clients Say</Typography>
        <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
          Discover how our services have made a positive impact in the lives of our customers.
        </Typography>
      </Box>

      {/* Testimonials Section */}
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <TestimonialCard testimonial={testimonial} />
          </Grid>
        ))}
      </Grid>

      {/* Call to Action Section */}
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ padding: '10px 20px', backgroundColor: '#177F2E', '&:hover': { backgroundColor: '#0b4017' } }}
        >
          Join Us Today
        </Button>
      </Box>
    </Container>
  );
};

export default Testimonials;
