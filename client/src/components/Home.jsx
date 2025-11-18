import React from 'react';
import { Box, Typography, Grid, Button, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import WellnessImage from '../../public/wellness-image.jpg'; 

// "vegan diets", "beginner workouts", "boost your energy", "boost your mood", "improve your sleep", "improve your digestion", "improve your skin", "improve your posture", "boost your immunity", "improve your microbiome health", 
// Story Highlights: Feature personal stories with clickable links to read more.
// Optimize images and implement lazy loading.
//     Clear CTAs: Use calls-to-action (e.g., “Try a New Recipe” or “Explore Stories”).
// Dynamic Content:
// Show content based on seasons (e.g., “Winter Wellness Tips”).


//  join now button in home: if user is logged in - remove or exchange?

const Home = () => {
    return (
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                    backgroundImage: `url(${WellnessImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative', // Needed to position the overlay
                    color: 'white',
                    textAlign: 'center',
                    padding: '0 20px',
                }}
            >
                {/* Dim Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', // 50%-60% dark overlay
                    }}
                />

                <Box sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '3rem' }}>
                        Unlock Your Best Self
                    </Typography>
                    <Typography variant="h5" sx={{ margin: '20px 0', fontStyle: 'italic' }}>
                        Join our wellness club and explore curated products and personalized fitness plans.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                        <NavLink to="/register" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#177F2E', '&:hover': { backgroundColor: '#0b4017' }, padding: '10px 20px' }}>
                                Join Now
                            </Button>
                        </NavLink>
                        <NavLink to="/products" style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" sx={{ borderColor: '#177F2E', color: '#fff', padding: '10px 20px' }}>
                                Shop Wellness
                            </Button>
                        </NavLink>
                    </Box>
                </Box>
            </Box>

            {/* Features Section */}
            <Container sx={{ paddingY: 5 }}>
                <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 4 }}>
                    Why Choose Us?
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {/* Feature 1 */}
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Box sx={{ backgroundColor: '#177F2E', color: 'white', padding: 3, borderRadius: '10px' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Personalized Plans
                            </Typography>
                            <Typography sx={{ marginTop: 2 }}>
                                Get tailored fitness and wellness programs based on your unique needs.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Feature 2 */}
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Box sx={{ backgroundColor: '#177F2E', color: 'white', padding: 3, borderRadius: '10px' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Premium Products
                            </Typography>
                            <Typography sx={{ marginTop: 2 }}>
                                Explore a wide range of organic and wellness-enhancing products in our store.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Feature 3 */}
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Box sx={{ backgroundColor: '#177F2E', color: 'white', padding: 3, borderRadius: '10px' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Community Support
                            </Typography>
                            <Typography sx={{ marginTop: 2 }}>
                                Join a community of like-minded individuals who support your wellness journey.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        
        </Box>
    );
};

export default Home;
