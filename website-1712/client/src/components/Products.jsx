import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Button, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import ProductsCard from './ProductsCard';
import { getAllProductsService } from '../service/service';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [searchLocal, setSearchLocal] = useState("");
// console.log({products});
// useEffect(()=>{
//   console.log(products)
// },[products])


  const handleFetchProducts = async () => {
    try {
      // to service
      const response = await getAllProductsService();;
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    handleFetchProducts();
  }, []);

  useEffect(() => {
    if (!searchLocal) {
        setFilterProducts(products);
        return;
    }
    setFilterProducts(products.filter(p => ((p.name).toLocaleLowerCase()).includes(searchLocal.toLocaleLowerCase()) ));
}, [searchLocal, products]);

  const handleSearchChange = async (e) => {
    setSearchLocal(e.target.value);
};

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
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', marginBottom: 4 }}>
        <Grid
          container
          spacing={3}
          direction={{
            xs: "column",
            sm: "row"
          }}
        >

          <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1, marginBottom: 4 }}>
            <TextField
              label="Search Products"
              value={searchLocal}
              onChange={handleSearchChange}
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
          </Box>

          <Box sx={{
            display: 'flex', width: {
              xs: "auto",
              sm: "45%"
            }, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 2 }
          }}>
            {/* Add filter buttons or dropdowns */}
            <Button variant="outlined" sx={{ borderColor: '#177F2E', color: '#000' }}>Category</Button>
            <Button variant="outlined" sx={{ borderColor: '#177F2E', color: '#000' }}>Sort by Price</Button>
          </Box>
        </Grid>
      </Box>

      {/* Product List */}
      <Grid container spacing={4}>

        {filterProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductsCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination or Load More Button */}
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Button variant="outlined" sx={{ borderColor: '#177F2E', color: '#000' }} size="large">
          Load More Products
        </Button>
      </Box>
    </Container>
  );
};

export default ProductsPage;
