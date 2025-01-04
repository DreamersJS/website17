import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/service-user.js';
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/userAtom.js";

 const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const setUser = useSetRecoilState(userState); 
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     console.log('User updated:', user);
  //     navigate('/');  // Redirect if user is already logged in
  //   }
  // }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      if (!data || !data.username || !data.token || !data.id) {
        console.log('LoginData:', data);
        throw new Error("Username, id, or token is missing in the response");
      }
      const { token, user } = data;

      // Save token in cookie
      Cookies.set('authToken', token, { secure: true, sameSite: 'Strict', expires: 1 });
  
      // Update Recoil state
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
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
