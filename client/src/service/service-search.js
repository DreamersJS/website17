import { apiFetch } from "./apiFetch";
import { API_URL } from "../utils/helpers";

// search
export const searchService = async (query) => {
  console.log({ query });
  const res = await apiFetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`, {
    method: "GET",
  });
  console.log({ res });
  if (!res.ok) throw new Error("Search request failed");
  const data = await res.json();
  console.log({ data });
  return data.results;
};
