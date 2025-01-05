import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateForm, registerUser } from '../service/service-user.js';
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/userAtom.js";

 const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState); // Recoil setter for user state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm({ username, email, password });
    if (validationError) {
      console.error('Validation error:', validationError);
      return;
    }

    setLoading(true);

    try {
      const data =  await registerUser({ username, email, password });
     // Persist user and token in recoil state
     // Assuming the response includes user details and initial results
      const { user } = data;

      // Update Recoil state
      setUser({
        id: user.id,
        email: user.email,
        username: user.username,
        photo: user.photo,
        role: user.role,
        coachId: user.coachId,
      });
      navigate('/');  // Redirect to home or authenticated area

    } catch (err) {
      console.error('Register error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
