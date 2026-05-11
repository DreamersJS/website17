import { apiFetch } from "./apiFetch";
import { API_URL } from "../utils/helpers";

export const createCartService = async () => {
  const res = await apiFetch(`${API_URL}/api/cart/create`, {
    method: "POST",
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
  if (!res.ok) {
    throw new Error("Cart creation failed");
  }
  const data = await res.json();
  return data;
};

export const getCartService = async () => {
  const res = await apiFetch(`${API_URL}/api/cart/get`);
  if (!res.ok) {
    throw new Error("No cart found");
  }
  const data = await res.json();
  return data;
};

export const deleteCartService = async () => {
  const res = await apiFetch(`${API_URL}/api/cart/delete`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("delete cart request failed");
  const data = await res.json();
  return data.message;
};

export const addItemsToCart = async (productId, quantity = 1) => {
  const res = await apiFetch(`${API_URL}/api/cart/items`, {
    method: "POST",
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
  if (!res.ok) {
    throw new Error("Adding item in cart failed");
  }
  const data = await res.json();
  return data;
};

export const deleteItemsFromCart = async (productId) => {
  const res = await apiFetch(`${API_URL}/api/cart/items/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Delete item from cart failed");
  }
  const data = await res.json();
  return data;
};

export const updateItemsFromCart = async (productId, quantity) => {
  const res = await apiFetch(`${API_URL}/api/cart/items/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
  if (!res.ok) {
    throw new Error("Update failed");
  }
  const data = await res.json();
  return data;
};

// What if user adds same product twice?
// What if product is out of stock?
// What if user is not logged in?
// If I refresh → cart still there
