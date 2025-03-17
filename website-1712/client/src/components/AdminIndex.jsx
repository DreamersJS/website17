import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userAtom";

const AdminIndex = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch(`/api/coaches/admin/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to verify admin role');
        }
        const data = await response.json();
        if (data.role === 'ADMIN') {
          setIsAdmin(true);
        } else {
          navigate('/'); // Redirect if not admin
        }
      } catch (error) {
        console.error('Error verifying admin role:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return(
    isAdmin ? <Admin/> : null
  ) 
};
export default AdminIndex; 