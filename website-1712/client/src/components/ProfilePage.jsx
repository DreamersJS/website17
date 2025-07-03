import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import ProfileSkeleton from './ProfileSkeleton';
import ButtonHeader, { ButtonAction } from "./Button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userAtom';
import { useNavigate } from 'react-router-dom';
import { useFeedback } from './FeedbackContext';

const ProfilePage = () => {
    const [user, setUser] = useRecoilState(userState);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', photo: '' });
    const navigate = useNavigate();
    const { showFeedback } = useFeedback();

    useEffect(()=>{console.log(open);},[open])
    useEffect(() => {
        if (user?.id) {
            setLoading(false);
            setFormData({ username: user.username, email: user.email, photo: user.photo });
        }else{
            navigate('/login');
        }
    }, [user]);

    const handleToggleModal = () => setOpen(prev=>!prev);

    const handleChange = (prop) => (e) => {
        setFormData({ ...formData, [prop]: e.target.value });
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
        handleToggleModal();
        showFeedback('Edit profile successful!', 'success');
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
                    <ButtonAction onClick={handleToggleModal} content="Edit Profile"  />
                    <ButtonAction onClick={() => { }} content="Change Password"  />

                </Box>
            </Box>

            <Divider sx={{ marginTop: '30px', marginBottom: '30px' }} />

           {open && ( <Dialog open={open} onClose={handleToggleModal} fullWidth maxWidth="sm">
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField fullWidth margin="dense" label="Username" value={formData?.username} onChange={handleChange('username')} />
                    <TextField fullWidth margin="dense" label="Email" name="email" value={formData?.email} onChange={handleChange("email")} />
                    <TextField fullWidth margin="dense" label="Photo URL" name="photo" value={formData?.photo} onChange={handleChange("photo")} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToggleModal} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            )}
        </Box>
    );
};

export default ProfilePage;
