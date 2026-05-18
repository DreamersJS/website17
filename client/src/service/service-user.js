import { apiFetch } from "./apiFetch";
import { API_URL } from "../utils/helpers";
import { authResponseSchema, } from "../../../shared/schemas/user.schema";

export const vZod = (schema, data) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
};

export const registerUser = async ({ username, password, email }) => {
  try {
    const response = await apiFetch(`${API_URL}/api/users/register`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error(
        errorData.message ||
        errorData.error ||
        Object.values(errorData.errors?.fieldErrors || {})?.[0]?.[0] ||
        "Failed to register user"
      );
    }

    const responseJson = await response.json();
    const parsed = vZod(authResponseSchema, responseJson)
    if (!parsed.success) {
      console.error(parsed.errors);
      throw new Error("Invalid server response");
    }
    return {
      user: parsed.data.data,
      message: parsed.data.message,
      accessToken: parsed.data.meta?.accessToken,
    };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await apiFetch(`${API_URL}/api/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log({response});
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message ||
        errorData.error ||
        Object.values(errorData.errors?.fieldErrors || {})?.[0]?.[0] ||
        "Failed to login");
    }
    const responseJson = await response.json();
    const parsed = vZod(authResponseSchema, responseJson)
    if (!parsed.success) {
      console.error(parsed.errors);
      throw new Error("Invalid server response");
    }
    return {
      user: parsed.data.data,
      message: parsed.data.message,
      accessToken: parsed.data.meta?.accessToken,
    };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiFetch(`${API_URL}/api/users/logout`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to log out");
    }
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await apiFetch(`${API_URL}/api/users/all`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await apiFetch(`${API_URL}/api/coaches/${userId}/role`, {
      method: "PUT",
      body: JSON.stringify({ role: newRole }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update role");
    }
    console.log("Role updated");
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
};

export const updateIsBlocked = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/coaches/${userId}/block`, {
      method: "POST",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update block status");
    }
    console.log("Block status updated");
  } catch (error) {
    console.error("Error updating block status:", error);
    throw error;
  }
};

export const refreshUser = async () => {
  const res = await apiFetch(`${API_URL}/api/users/refresh`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Refresh failed");
  }
  return res.json();
};

export const profileUpdate = async (userId, formData) => {
  const response = await apiFetch(`${API_URL}/api/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  const updatedUser = await response.json();
  return updatedUser.data;
};
