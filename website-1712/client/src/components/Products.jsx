import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Button, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import ProductsCard from './ProductsCard';
import { getAllProductsService } from '../service/service';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [searchLocal, setSearchLocal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log({products});
  useEffect(()=>{
    console.log(products)
  },[products])

  useEffect(() => {
    const initialSearch = searchParams.get("search") || "";
    setSearchLocal(initialSearch);
  }, []);
  
  const handleFetchProducts = async () => {
    try {
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
    let filtered = [...products];

if (selectedCategory) {
  filtered = filtered.filter((p) =>
    p.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
  );
}

    if (searchLocal) {
      const search = searchLocal.trim().toLowerCase();
      filtered = filtered.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(search);
        const tagMatch = p.tags?.some((e) =>
          e.tag.name.toLowerCase().includes(search)
        );
        return nameMatch || tagMatch;
      });
    }

    switch (sortOption) {
      case 'name-asc':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilterProducts(filtered);
  }, [searchLocal, selectedCategory, products, sortOption]);


  const handleSearchChange = async (e) => {
    setSearchLocal(e.target.value);
    setSearchParams({ search: e.target.value });
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

          <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
            <TextField
              label="Search Products"
              value={searchLocal}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              sx={{ width: '80%' }}
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

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#177F2E',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#145c1d',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#177F2E',
                  },
                  color: '#000', // text color
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Supplements">Supplements</MenuItem>
                <MenuItem value="Cosmetics">Cosmetics</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                displayEmpty
                size="small"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#177F2E',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#145c1d',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#177F2E',
                  },
                  color: '#000',
                }}
              >
                <MenuItem value="">Sort By</MenuItem>
                <MenuItem value="name-asc">Name (A-Z)</MenuItem>
                <MenuItem value="name-desc">Name (Z-A)</MenuItem>
                <MenuItem value="price-asc">Price (Low to High)</MenuItem>
                <MenuItem value="price-desc">Price (High to Low)</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
              </Select>
            </FormControl>

          </Box>
        </Grid>
      </Box>

      {/* Product List */}
      {filterProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h6" color="textSecondary">
            No results found for "{searchLocal}"
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filterProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductsCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}


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
