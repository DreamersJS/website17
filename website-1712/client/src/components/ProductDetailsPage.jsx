import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from '@mui/material';
import { getProductByIdService } from '../service/service-product'; 

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByIdService(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6">Product not found</Typography>
      </Container>
    );
  }

  const { name, description, price, image, category, tags } = product;

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 4, borderRadius: 3 }}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{ width: { xs: '100%', md: 400 }, height: 'auto' }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold">{name}</Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            Category: {category?.name || 'N/A'}
          </Typography>

          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            {price} BGN
          </Typography>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {description}
          </Typography>

          {tags && tags.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Tags:</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {tags.map((tagObj, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: '4px 8px',
                      backgroundColor: '#177F2E',
                      color: '#fff',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  >
                    {tagObj.tag.name}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: '#177F2E',
              '&:hover': { backgroundColor: '#0b4017' },
            }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetailsPage;
