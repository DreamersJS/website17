import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductsCard = ({ product }) => {
    const { id, name, description, price, photo } = product;
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    // Limit description
    const limit = 100;
    const truncatedDescription = description.length > limit ? description.slice(0, limit) + '...' : description;

    return (
        <Container>
            <Card
                onClick={() => navigate(`/products/${product.id}`)}
                sx={{
                    height: 400, // fixed height for all cards; adjust as needed
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    boxShadow: 3,
                    cursor: 'pointer',
                }}
            >
                {photo && photo !== "..." && photo.trim() ? (
                    <CardMedia
                        component="img"
                        alt={name + ' photo'}
                        height="200"
                        image={photo}
                        sx={{ objectFit: 'cover' }}
                    />
                ) : (
                    // Placeholder box if no image
                    <Box
                        sx={{
                            height: 200,
                            backgroundColor: '#eee',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#999',
                            fontSize: '1.5rem',
                        }}
                    >
                        No Image
                    </Box>
                )}

                <CardContent
                    sx={{
                        flexGrow: 1, // takes remaining space
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" noWrap>
                        {name}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mt: 1, flexGrow: 1, overflow: 'hidden' }}
                    >
                        {isExpanded ? description : truncatedDescription}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" color="black">
                            {price} BGN
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                mt: 1,
                                backgroundColor: '#177F2E',
                                '&:hover': { backgroundColor: '#0b4017' },
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('hey');
                                return;
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
};
export default ProductsCard;
