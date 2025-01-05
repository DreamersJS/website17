import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateForm, registerUser } from '../../service/service-user.js';
import { useSetRecoilState } from "recoil";
import { userState } from "../../recoil/userAtom.js";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Container,
  Grid,
} from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm({ username, email, password });
    if (validationError) {
      console.error('Validation error:', validationError);
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser({ username, email, password });
      const { user } = data;

      setUser({
        id: user.id,
        email: user.email,
        username: user.username,
        photo: user.photo,
        role: user.role,
        coachId: user.coachId,
      });

      navigate('/');
    } catch (err) {
      console.error('Register error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Register
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Create your account to get started!
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{
              padding: '10px 20px',
              backgroundColor: '#177F2E',
              '&:hover': { backgroundColor: '#0b4017' },
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ color: 'white', marginRight: 2 }} />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
