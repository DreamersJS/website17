import React from 'react';
import { Container, Typography, Box, Grid, Button, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import ProductsCard from './ProductsCard';

// Sample products data
const products = [
  {
    id: 1,
    name: "Fitness Tracker",
    description: "Track your fitness goals with this advanced fitness tracker.",
    price: "$49.99",
    rating: 4.5,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Yoga Mat",
    description: "Premium yoga mat for maximum comfort and stability.",
    price: "$29.99",
    rating: 4.0,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    name: "Protein Powder",
    description: "High-quality protein powder for muscle recovery.",
    price: "$19.99",
    rating: 4.8,
    image: "https://via.placeholder.com/200",
  }, {
    id: 3,
    name: "Protein Powder",
    description: "High-quality protein powder for muscle recovery.",
    price: "$19.99",
    rating: 4.8,
    image: "https://via.placeholder.com/200",
  }, {
    id: 3,
    name: "Protein Powder",
    description: "High-quality protein powder for muscle recovery.",
    price: "$19.99",
    rating: 4.8,
    image: "https://via.placeholder.com/200",
  }, {
    id: 3,
    name: "Protein Powder",
    description: "High-quality protein powder for muscle recovery.",
    price: "$19.99",
    rating: 4.8,
    image: "https://via.placeholder.com/200",
  }, {
    id: 3,
    name: "Protein Powder",
    description: "High-quality protein powder for muscle recovery.",
    price: "$19.99",
    rating: 4.8,
    image: "https://via.placeholder.com/200",
  },
  // Add more products as needed
];

const ProductsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 8 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 5 }}>
        <Typography variant="h3" fontWeight="bold">Shop Our Products</Typography>
        <Typography variant="h6" color="#000" sx={{ marginTop: 2 }}>
          Browse through our collection of wellness and fitness products.
        </Typography>
      </Box>

      {/* Search and Filter Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          size="small"
          sx={{ width: '40%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Add filter buttons or dropdowns */}
          <Button variant="outlined" color="#000">Category</Button>
          <Button variant="outlined" color="#000">Sort by Price</Button>
        </Box>
      </Box>

      {/* Product List */}
      <Grid container spacing={4}>

        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProductsCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination or Load More Button */}
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Button variant="outlined" color="#000" size="large">
          Load More Products
        </Button>
      </Box>
    </Container>
  );
};

export default ProductsPage;
