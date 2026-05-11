import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/userAtom.js";
import { useEffect, useState } from "react";
import { refreshUser } from "../service/service-user.js";

export const useHydrateUserState = () => {
  const setUser = useSetRecoilState(userState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data, meta } = await refreshUser();

        setUser({
          ...data,
          accessToken: meta?.accessToken,
        });
      } catch (error) {
        console.error("Failed to decode token:", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);
  return loading;
};
