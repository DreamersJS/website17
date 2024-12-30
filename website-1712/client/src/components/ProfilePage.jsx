import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import ProfileSkeleton from './ProfileSkeleton'; // Importing the skeleton
import ButtonUsage from "./Button";

// separate Diary page for user to input data and track progress!!!
const ProfilePage = ({ user }) => {
    const [loading, setLoading] = useState(true);

    // Simulating data fetch to see the skeleton ui
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // Set loading to false after 3 seconds
        }, 3000);
    }, []);

    // Sample user data (in a real scenario, this would be fetched from an API)
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        profilePicture: "https://via.placeholder.com/100",
        coachingSessions: [
            { title: "Fitness Coaching", date: "Jan 10, 2024", status: "Completed" },
            { title: "Nutrition Coaching", date: "Feb 20, 2024", status: "Upcoming" },
        ],
        purchases: [
            { product: "Premium Membership", date: "Jan 15, 2024" },
            { product: "Yoga Mat", date: "Feb 5, 2024" },
        ],
        feedingHabits: [
            { meal: 'Breakfast', calories: 400, type: 'Oats', notes: 'High fiber' },
            { meal: 'Brunch', calories: '', type: '', notes: '' },
            { meal: 'Lunch', calories: 600, type: 'Grilled Chicken Salad', notes: 'Low fat' },
            { meal: 'Snacks', calories: '', type: '', notes: '' },
            { meal: 'Dinner', calories: 500, type: 'Steamed Vegetables', notes: 'High protein' }
        ],
        waterIntake: 2, // Liters
        physicalProgress: [
            { metric: 'Weight', value: 75, date: 'Jan 15, 2024' }, // Value in kg
            { metric: 'Body Fat %', value: 20, date: 'Jan 15, 2024' }, // Value in %
            { metric: 'Muscle Mass', value: 35, date: 'Jan 15, 2024' } // Value in kg
        ],
        healthImprovements: [
            { metric: 'Energy Levels', value: 70, date: 'Jan 15, 2024' }, // Percentage
            { metric: 'Sleep Quality', value: 80, date: 'Jan 15, 2024' }, // Percentage
            { metric: 'Mood', value: 85, date: 'Jan 15, 2024' } // Percentage
        ],
        fitnessProgress: [
            { metric: 'Endurance', value: 60, date: 'Jan 15, 2024' }, // Percentage
            { metric: 'Strength', value: 65, date: 'Jan 15, 2024' }, // Percentage
            { metric: 'Mobility', value: 55, date: 'Jan 15, 2024' } // Percentage
        ],
        successStories: [
            { story: "Maria couldn't lift her knee, but now she can after consistent training. She's amazed by her progress!", date: 'Jan 10, 2024' },
            { story: "John couldn't run for more than 5 minutes, but now he runs 30 minutes without stopping!", date: 'Jan 12, 2024' }
        ],
        coachMessages: [
            { message: "Congrats, you reduced your fat by 3%!", date: "Jan 15, 2024" },
            { message: "Great job on completing your workout today!", date: "Jan 17, 2024" }
        ]
    });

    const handleInputChange = (e, section, index, field) => {
        const updatedData = { ...userData };
        updatedData[section][index][field] = e.target.value;
        setUserData(updatedData);
    };

    const handleProgressChange = (e, index) => {
        const updatedData = { ...userData };
        updatedData.progress[index].progress = e.target.value;
        setUserData(updatedData);
    };

    const handleWaterIntakeChange = (e) => {
        const updatedData = { ...userData };
        updatedData.waterIntake = e.target.value;
        setUserData(updatedData);
    };

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
                <ButtonUsage onClick={()=>{}} content="Edit Profile" />
                <ButtonUsage onClick={()=>{}} content="Change Password" />

                </Box>
            </Box>

            <Divider sx={{ marginTop: '30px', marginBottom: '30px' }} />

            {/* Coaching Sessions */}
            <Typography variant="h6">Coaching Sessions</Typography>
            {userData.coachingSessions.map((session, index) => (
                <Box key={index} sx={{ marginTop: '15px' }}>
                    <Typography variant="body1">{session.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>{session.date} - {session.status}</Typography>
                </Box>
            ))}

            <Divider sx={{ marginTop: '30px', marginBottom: '30px' }} />

            {/* Purchases */}
            <Typography variant="h6">Purchases</Typography>
            {userData.purchases.map((purchase, index) => (
                <Box key={index} sx={{ marginTop: '15px' }}>
                    <Typography variant="body1">{purchase.product}</Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>{purchase.date}</Typography>
                </Box>
            ))}

<Divider sx={{ marginTop: '30px', marginBottom: '30px' }} />

{/* Feeding Habits Table */}
<Typography variant="h6">Feeding Habits</Typography>
<TableContainer component={Paper} sx={{ marginTop: '20px' }}>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Meal</TableCell>
                <TableCell>Calories</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Notes</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {userData.feedingHabits.map((habit, index) => (
                <TableRow key={index}>
                    <TableCell>{habit.meal}</TableCell>
                    <TableCell>
                        <TextField
                            value={habit.calories}
                            onChange={(e) => handleInputChange(e, 'feedingHabits', index, 'calories')}
                            type="number"
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            value={habit.type}
                            onChange={(e) => handleInputChange(e, 'feedingHabits', index, 'type')}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            value={habit.notes}
                            onChange={(e) => handleInputChange(e, 'feedingHabits', index, 'notes')}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>

<Divider sx={{ marginTop: '30px', marginBottom: '30px' }} />

{/* Water Intake */}
<Typography variant="h6">Water Intake (Liters)</Typography>
<TextField
    value={userData.waterIntake}
    onChange={handleWaterIntakeChange}
    type="number"
    sx={{ marginTop: '10px' }}
    fullWidth
/>

<Divider sx={{ marginTop: '30px', marginBottom: '30px' }} />

{/* Progress Tracking */}
{/* input each day or on change ?ask for feedback? */}
<Typography variant="h6">Progress Tracking</Typography>
{userData.physicalProgress.map((progress, index) => (
    <Box key={index} sx={{ marginTop: '15px' }}>
        <Typography variant="body1">{progress.metric}</Typography>
        <TextField
            value={progress.value}
            onChange={(e) => handleProgressChange(e, index)}
            sx={{ marginTop: '10px' }}
            fullWidth
        />
    </Box>
))}

<Divider sx={{ marginTop: '30px', marginBottom: '30px' }} />

{/* Messages from Coach */}
<Typography variant="h6">Messages from Your Coach:</Typography>
{userData.coachMessages.map((message, index) => (
    <Box key={index} sx={{ marginTop: '15px' }}>
        <Typography variant="body1">{message.message}</Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>{message.date}</Typography>
    </Box>
))}
        </Box>
    );
};

export default ProfilePage;
