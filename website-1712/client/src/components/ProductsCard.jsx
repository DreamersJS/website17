import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const ProductsCard = ({ product }) => {
    const { id, name, description, price, image } = product;

    return (
        <Container>

            <Grid item xs={12} sm={4} key={id}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        alt={name}
                        height="200"
                        image={image}
                    />
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                            {description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                            <Typography variant="h6" color="primary">
                                {price}
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
            </Grid>

        </Container>
    )
};
export default ProductsCard;