import { getRecoil } from "recoil-nexus";
import { userState } from "../recoil/userAtom";

export const apiFetch = async (url, options = {}) => {
  const user = getRecoil(userState);

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (user?.accessToken) {
    headers.Authorization = `Bearer ${user.accessToken}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  return res;
};
