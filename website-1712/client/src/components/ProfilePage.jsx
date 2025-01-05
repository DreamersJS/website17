import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Divider, Paper, TextField } from '@mui/material';
import ProfileSkeleton from './ProfileSkeleton';
import ButtonUsage from "./Button";
import { useRecoilState, useRecoilValue, useSetRecoilState  } from 'recoil';
import { userState } from '../recoil/userAtom';

// add modal for edit profile
const ProfilePage = () => {
    const setUser = useSetRecoilState(userState); // Setter for the user state
    const user = useRecoilValue(userState); // Read the user state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(`app user`, user);
        if (user?.id) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <ProfileSkeleton />;
    }

    return (
        <Box sx={{ padding: '20px' }}>
            {/* Profile Information */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={user.photo || "https://via.placeholder.com/100"} sx={{ width: 100, height: 100 }} />
                <Typography variant="h5" sx={{ marginTop: '15px' }}>{user.name}</Typography>
                <Typography variant="body1" sx={{ color: 'gray', marginTop: '5px' }}>{user.email}</Typography>

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
