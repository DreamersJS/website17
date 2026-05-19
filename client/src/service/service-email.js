import { apiFetch } from "./apiFetch";
import { API_URL } from "../utils/helpers";

export const checkDomain = async (email) => {
  try {
    const response = await apiFetch(`${API_URL}/api/email/checkDomain`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking domain MX records:", error);
    throw error;
  }
};

export const emailSendConfirmationEmail = async (email) => {
  try {
    const response = await apiFetch(`${API_URL}/api/email/sendConfirmationEmail`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
};

export const emailSendMsg = async (name, email, phone, message) => {
  try {
    const response = await apiFetch(`${API_URL}/api/email/sendMsg`, {
      method: "POST",
      body: JSON.stringify({ name, email, phone, message }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

/**
 * @param {*} email 
 * @returns  return res.status(200).json({
            message: 'Email confirmed successfully. You may now send your message.',
            confirmed: true,
            email
        });
 */
export const checkEmailConfirmed = async (email) => {
  try {
    const response = await apiFetch(`${API_URL}/api/email/isConfirmed?email=${encodeURIComponent(email)}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error isConfirmed:", error);
    throw error;
  }
};

export const fetchEmailConfirmed = async () => {
  try {
    const response = await apiFetch(`${API_URL}/api/email/confirmEmail?token=${token}&email=${email}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to confirm email')
    };

  } catch (error) {
    console.error("Error isConfirmed:", error);
    throw error;
  }
};