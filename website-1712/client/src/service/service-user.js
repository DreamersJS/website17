
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
    console.log('Starting user registration...');
    console.log('Request data:', { username, email });

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

    console.log('Received response from server:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error response:', errorData);
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

/**
 * 
 * Since your auth token is HTTP-only, it is not accessible in JavaScript, meaning you cannot directly reference authToken in the frontend. This means your frontend should not manually send the token in the headers. Instead, just ensure that requests include credentials so the cookie is automatically sent.
 */
export const fetchUsers = async () => {
  try {
    const response = await fetch("/api/users/all", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await fetch(`/api/coaches/${userId}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
      credentials: 'include'
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update role');
    }
    console.log('Role updated');
  } catch (error) {
    console.error("Error updating role:", error);
  }
}

export const updateIsBlocked = async (userId) => {
  try {
    const response = await fetch(`/api/coaches/${userId}/block`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update block status');
    }
    console.log('Block status updated');
  } catch (error) {
    console.error("Error updating block status:", error);
  }
}