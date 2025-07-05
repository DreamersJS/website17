import React, { useEffect, useMemo, useState } from 'react';
import { Container, Typography, Box, Grid, Button, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import ProductsCard from './ProductsCard';
import { getAllProductsService } from '../service/service';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  // const [filterProducts, setFilterProducts] = useState([]);
  const [searchLocal, setSearchLocal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const DEFAULT_VISIBLE_COUNT = 10;

  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + visibleCount);
  };
  const handleItemsPerPageChange = (e) => {
    const count = Number(e.target.value);
    setVisibleCount(count);
  };


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
    if (searchParams.has("search")) {
      setSearchLocal(searchParams.get("search") || "");
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
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
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'newest':
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return filtered;
    }
  }, [products, searchLocal, selectedCategory, sortOption]);



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
      <Box sx={{ marginBottom: 4 }}>
        <Grid container spacing={2} alignItems="center">

          {/* Search Field */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Search Products"
              value={searchLocal}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Category Filter */}
          <Grid item xs={12} sm={6} md={2.5}>
            <FormControl size="small" fullWidth>
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
                  color: '#000',
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Supplements">Supplements</MenuItem>
                <MenuItem value="Cosmetics">Cosmetics</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Sort Option */}
          <Grid item xs={12} sm={6} md={2.5}>
            <FormControl size="small" fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                label="Sort By"
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
          </Grid>

          {/* Show Count */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Show</InputLabel>
              <Select
                value={visibleCount}
                onChange={handleItemsPerPageChange}
                label="Show"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#177F2E' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#145c1d' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#177F2E' },
                  color: '#000',
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={filteredProducts.length}>All</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>
      </Box>



      {/* Product List */}
      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h6" color="textSecondary">
            No results found for "{searchLocal}"
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.slice(0, visibleCount).map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductsCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}


      {/* Pagination or Load More Button */}
      {visibleCount < filteredProducts.length && (
        <Box sx={{ textAlign: 'center', marginTop: 5 }}>
          <Button
            variant="outlined"
            sx={{ borderColor: '#177F2E', color: '#000' }}
            size="large"
            onClick={handleLoadMore}
          >
            Load More Products
          </Button>
        </Box>
      )}

      {/* scroll to top */}
      {showScroll && (
        <Box
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 40,
            right: 30,
            zIndex: 1000,
            cursor: 'pointer',
            backgroundColor: '#177F2E',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: '50%',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
            transition: 'opacity 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#145c1d',
            },
          }}
        >
          ↑
        </Box>
      )}

    </Container>
  );
};

export default ProductsPage;
