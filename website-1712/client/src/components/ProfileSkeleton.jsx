import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box, Typography } from '@mui/material';

const ProfileSkeleton = () => {
    return (
        <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Profile Picture Skeleton */}
            <Skeleton variant="circular" width={100} height={100} />

            {/* User Info Skeleton */}
            <Skeleton variant="text" width="40%" height={30} sx={{ marginTop: '15px' }} />
            <Skeleton variant="text" width="60%" height={30} sx={{ marginTop: '10px' }} />

            {/* Buttons Skeleton */}
            <Skeleton variant="rectangular" width={150} height={40} sx={{ marginTop: '20px' }} />
            <Skeleton variant="rectangular" width={150} height={40} sx={{ marginTop: '10px' }} />

            {/* Coaching Sessions / Purchases Skeleton */}
            <Box sx={{ marginTop: '30px', width: '100%' }}>
                <Skeleton variant="text" width="50%" height={30} sx={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width="100%" height={80} sx={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width="100%" height={80} sx={{ marginBottom: '10px' }} />
                <Skeleton variant="rectangular" width="100%" height={80} />
            </Box>
        </Box>
    );
};

export default ProfileSkeleton;
