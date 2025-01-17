
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
 * @param {*} param0 { username, password, email }
 * @returns response.json() containing user details
 */
export const registerUser = async ({ username, password, email }) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
        credentials: 'include', // Include cookies with the request
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register user');
      }
  
      const data = await response.json();
      console.log('User registered successfully:', data);
      return data; 
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
  
  
export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: 'include', // Include cookies with the request
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to login');
    }

    const data = await response.json();
    console.log('User logged in successfully:', data);
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to log out');
    }
    
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
