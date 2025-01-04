import { atom } from "recoil";
import { useResetRecoilState } from 'recoil';

const initialState = {
  id: null,
  email: null,
  username: null,
  photo: null,
  role: null,
  coachId: null,
};

export const userState = atom({
  key: "userState", 
  default: initialState,
});

export function useLogout() {
  const resetUserState = useResetRecoilState(userState);

  const logout = () => {
    resetUserState(); // Resets to initialState
  };

  return logout;
}
// a separate atom for tracking personal results?