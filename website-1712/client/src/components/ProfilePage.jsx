import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import ProfileSkeleton from './ProfileSkeleton';
import ButtonUsage from "./Button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userAtom';

const ProfilePage = () => {
    const setUser = useSetRecoilState(userState);
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', photo: '' });

    useEffect(() => {
        if (user?.id) {
            setLoading(false);
            setFormData({ username: user.username, email: user.email, photo: user.photo });
        }
    }, [user]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async() => {
        const response = await fetch(`/api/users/${user.id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)

        });
        setUser({ ...user, ...formData });
        handleClose();
    };

    if (loading) {
        return <ProfileSkeleton />;
    }

    return (
        <Box sx={{ padding: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={user.photo || "https://via.placeholder.com/100"} sx={{ width: 100, height: 100 }} />
                <Typography variant="h5" sx={{ marginTop: '15px' }}>{user.username}</Typography>
                <Typography variant="body1" sx={{ color: 'gray', marginTop: '5px' }}>{user.email}</Typography>

                <Box sx={{ marginTop: '20px', display: 'flex', gap: 2 }}>
                    <ButtonUsage onClick={handleOpen} content="Edit Profile" />
                    <ButtonUsage onClick={() => { }} content="Change Password" />
                </Box>
            </Box>

            <Divider sx={{ marginTop: '30px', marginBottom: '30px' }} />

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField fullWidth margin="dense" label="Username" name="username" value={formData.username} onChange={handleChange} />
                    <TextField fullWidth margin="dense" label="Email" name="email" value={formData.email} onChange={handleChange} />
                    <TextField fullWidth margin="dense" label="Photo URL" name="photo" value={formData.photo} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfilePage;
