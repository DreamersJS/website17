import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Button, Skeleton } from '@mui/material';
import ProductsCard from './ProductsCard';
import { getAllProductsService } from '../service/service-product';
import { useSearchParams } from 'react-router-dom';
import { useFilterSearchSort } from '../hooks/useFilterSearchSort';
import SearchToolBar from './SearchToolbar';
import ProductCardSkeleton from './ProductCardSkeleton'; 

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchLocal, setSearchLocal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const DEFAULT_VISIBLE_COUNT = 10;
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);
  const [showScroll, setShowScroll] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleFetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProductsService();
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    handleFetchProducts();
  }, []);

  useEffect(() => {
    if (searchParams.has("search")) {
      setSearchLocal(searchParams.get("search") || "");
    }
  
    if (searchParams.has("category")) {
      setSelectedCategory(searchParams.get("category") || "");
    }
  
    if (searchParams.has("sort")) {
      setSortOption(searchParams.get("sort") || "");
    }
  }, [searchParams]);
  

  const filteredProducts = useFilterSearchSort({
    items: products,
    searchQuery: searchLocal,
    searchKeys: ['name', 'tags.tag.name'],
    categoryKey: 'category.name',
    selectedCategory,
    sortKeys: [
      sortOption === 'name-asc' && { key: 'name', order: 'asc' },
      sortOption === 'name-desc' && { key: 'name', order: 'desc' },
      sortOption === 'price-asc' && { key: 'price', order: 'asc' },
      sortOption === 'price-desc' && { key: 'price', order: 'desc' },
      sortOption === 'newest' && { key: 'createdAt', order: 'desc' },
    ].filter(Boolean),
  });

  const handleSearchChange = (value) => {
    setSearchLocal(value);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("search", value);
      return newParams;
    });
  };
  
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) newParams.set("category", value);
      else newParams.delete("category");
      return newParams;
    });
  };
  
  const handleSortChange = (value) => {
    setSortOption(value);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) newParams.set("sort", value);
      else newParams.delete("sort");
      return newParams;
    });
  };
  

  if (loading) {
    return ( <Grid container spacing={4}>
      <Skeleton variant="rectangular" width="100%" height={80} sx={{ marginTop: '50px' }} />
      <Skeleton variant="text" width="100%" height={80} sx={{ marginBottom: '50px' }} />  
               
      {Array.from({ length: visibleCount }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ProductCardSkeleton />
        </Grid>
      ))}
    </Grid>);
}

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
      <SearchToolBar
        entityName="Products"
        searchTerm={searchLocal}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categoryOptions={['Supplements', 'Cosmetics']}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        sortOptions={[
          { label: 'Name (A-Z)', value: 'name-asc' },
          { label: 'Name (Z-A)', value: 'name-desc' },
          { label: 'Price (Low to High)', value: 'price-asc' },
          { label: 'Price (High to Low)', value: 'price-desc' },
          { label: 'Newest', value: 'newest' },
        ]}
        visibleCount={visibleCount}
        onVisibleCountChange={setVisibleCount}
        showCountOptions={[10, 20]}
        totalCount={filteredProducts.length}
      />

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