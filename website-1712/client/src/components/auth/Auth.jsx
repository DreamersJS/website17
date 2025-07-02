import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userAtom";

export default function Auth({ children }) {
    const user = useRecoilValue(userState);
    const isAdmin = user?.role === "ADMIN";
    const location = useLocation();

    if (!user?.id || !isAdmin) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}
