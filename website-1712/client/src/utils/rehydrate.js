import { useSetRecoilState } from "recoil";
import Cookies from "js-cookie";
import { userState } from "./state";

export const useHydrateUserState = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const userCookie = Cookies.get('authToken');
    if (userCookie) {
      try {
        const token = userCookie;
        const userPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
       // shall I add a role?
        setUser((prev) => ({
          ...prev,
          id: userPayload.userId,
          email: userPayload.email,
          token,
        }));
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [setUser]);
};
