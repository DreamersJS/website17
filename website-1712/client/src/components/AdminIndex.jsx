import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminIndex = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch('/api/coaches/admin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (response.data.role === 'ADMIN') {
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
    isAdmin ? <div>Welcome to Admin Panel
        <div>Admin Content</div>
        
    </div> : null
  ) 
};
export default AdminIndex; 