
export const validateForm = ({ username, email, password }) => {
    if (!username || username.length < 3) {
      return 'Username must be at least 3 characters long.';
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return 'Please enter a valid email address.';
    }
    if (!password || password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    return null; 
  };
  
/**
 * 
 * @param {*} param0 { username, password, email, coachId }
 * @returns response.json()
 */
export const registerUser = async ({ username, password, email, coachId }) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
          coachId: coachId || null,
        }),
        credentials: 'include', // Include cookies with the request
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register user');
      }
  
      console.log('User registered successfully');// later use ShowFeedback
      return await response.json(); 
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
  
  
