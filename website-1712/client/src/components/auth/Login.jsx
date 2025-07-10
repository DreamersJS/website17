import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../../service/service-user.js';
import { useSetRecoilState } from "recoil";
import { userState } from "../../recoil/userAtom.js";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { useFeedback } from '../hoc/FeedbackContext.jsx';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const { showFeedback } = useFeedback();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      const user = data.user;

      if (!user || !user.username || !user.id) {
        throw new Error("Username or ID is missing in the response");
      }

      setUser({
        id: user.id,
        email: user.email,
        username: user.username,
        photo: user.photo,
        role: user.role,
        isBlocked: user.isBlocked,
        coachId: user.coachId,
      });
      showFeedback('Login successful!', 'success');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      showFeedback('Login failed!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Login
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Please log in to continue.
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
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </Box>
        <Box>
          <Typography variant="body1" color="textSecondary">
            <NavLink
              to="/register"
            >
              or register
            </NavLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
