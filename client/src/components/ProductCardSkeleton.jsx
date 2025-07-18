import React from 'react';
import { Card, CardContent, Skeleton, Box, Container } from '@mui/material';

const ProductCardSkeleton = () => {
  return (
    <Container>
      <Card
        sx={{
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Image Placeholder */}
        <Skeleton variant="rectangular" height={200} />

        {/* Content Placeholder */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" width="80%" height={30} />
          <Skeleton variant="text" width="100%" height={60} sx={{ mt: 1 }} />
          <Skeleton variant="text" width="40%" height={30} sx={{ mt: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={36} sx={{ mt: 1 }} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductCardSkeleton;
