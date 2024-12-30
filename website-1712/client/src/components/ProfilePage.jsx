import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Divider, Paper, TextField } from '@mui/material';
import ProfileSkeleton from './ProfileSkeleton';
import ButtonUsage from "./Button";

// add modal for edit profile
const ProfilePage = ({ user }) => {
    const [loading, setLoading] = useState(true);

    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        profilePicture: "https://via.placeholder.com/100",
        coachName: "Coach Name", // shall I reference the coach name to the coach's profile?
    });

    if (loading) {
        return <ProfileSkeleton />;
    }

    return (
        <Box sx={{ padding: '20px' }}>
            {/* Profile Information */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={userData.profilePicture} sx={{ width: 100, height: 100 }} />
                <Typography variant="h5" sx={{ marginTop: '15px' }}>{userData.name}</Typography>
                <Typography variant="body1" sx={{ color: 'gray', marginTop: '5px' }}>{userData.email}</Typography>

                <Box sx={{ marginTop: '20px', display: 'flex', gap: 2 }}>
                    <ButtonUsage onClick={() => { }} content="Edit Profile" />
                    <ButtonUsage onClick={() => { }} content="Change Password" />

                </Box>
            </Box>

            <Divider sx={{ marginTop: '30px', marginBottom: '30px' }} />
    
        </Box>
    );
};

export default ProfilePage;
