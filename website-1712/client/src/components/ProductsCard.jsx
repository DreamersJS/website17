import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ProductsCard = ({ product }) => {
    const { id, name, description, price, image } = product;
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    // Limit description
    const truncatedDescription = description.length > 200 ? description.slice(0, 200) + '...' : description;

    return (
        <Container>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        alt={name + ' image'}
                        height="200"
                        image={image}
                    />
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold">
                            {name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ marginTop: 1 }}
                        >
                            {isExpanded ? description : truncatedDescription}
                        </Typography>
                        {description.length > 200 && (
                            <Button color="black" variant="contained"
                                sx={{ marginTop: 1, padding: '5px', fontSize: 'small' }}
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </Button>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                            <Typography variant="h6" color="black">
                                {price} BGN
                            </Typography>
                        </Box>
                        <Box sx={{ marginTop: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    padding: '10px',
                                    backgroundColor: '#177F2E',
                                    '&:hover': { backgroundColor: '#0b4017' },
                                }}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => navigate(`/products/${id}`)}
                                sx={{
                                    padding: '10px',
                                    backgroundColor: '#177F2E',
                                    '&:hover': { backgroundColor: '#0b4017' },
                                }}
                            >
                                Details
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
        </Container>
    )
};
export default ProductsCard;
