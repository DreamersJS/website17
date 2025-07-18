import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../recoil/userAtom.js'; 
import { logoutUser } from '../../service/service-user.js';

const Logout = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const performLogout = async () => {
    try {
      await logoutUser();
      logout(); // Reset to initial Recoil state
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  useEffect(() => {
    performLogout();
  }, []); // Perform logout when the component mounts

  return <div>Logging you out...</div>;
};

export default Logout;
