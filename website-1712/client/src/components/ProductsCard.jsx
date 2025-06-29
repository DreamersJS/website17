import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Button } from '@mui/material';

const ProductsCard = ({ product }) => {
    const { id, name, description, price, image } = product;

    const [isExpanded, setIsExpanded] = useState(false);

    // Limit description to 300 characters
    const truncatedDescription = description.length > 300 ? description.slice(0, 300) + '...' : description;

    return (
        <Container>
            {/* <Link
                to={`/product/${id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            > */}
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
                        {description.length > 300 && (
                            <Button
                                sx={{ marginTop: 1, padding: '5px', fontSize: 'small' }}
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </Button>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                            <Typography variant="h6" color="primary">
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
                        </Box>
                    </CardContent>
                </Card>
            {/* </Link> */}
        </Container>
    )
};
export default ProductsCard;
