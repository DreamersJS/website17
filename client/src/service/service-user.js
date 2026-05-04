import { apiFetch } from "./apiFetch";

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

    const response = await apiFetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });

    console.log('Received response from server:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error response:', errorData);
      throw new Error(errorData.error || 'Failed to register user');
    }

    const {data, meta} = await response.json();
    console.log('User registered successfully:', data);

    return {
      user: data,
      accessToken: meta?.accessToken,
    };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await apiFetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to login');
    }

    const { data, meta } = await response.json();
    console.log('User logged in successfully:', data);
    return {
      user: data,
      accessToken: meta?.accessToken,
    };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiFetch('/api/users/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to log out');
    }
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await apiFetch('/api/users/all', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await apiFetch(`/api/coaches/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role: newRole }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update role');
    }
    console.log('Role updated');
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error updating role:', error);
  }
};

export const updateIsBlocked = async (userId) => {
  try {
    const response = await apiFetch(`/api/coaches/${userId}/block`, {
      method: 'POST',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update block status');
    }
    console.log('Block status updated');
  } catch (error) {
    console.error('Error updating block status:', error);
  }
};

export const refreshUser = async () => {
  const res = await apiFetch('/api/users/refresh',
    {
      method: 'POST',
    })
  if (!res.ok) {
    throw new Error('Refresh failed');
  }
  return res.json();
};