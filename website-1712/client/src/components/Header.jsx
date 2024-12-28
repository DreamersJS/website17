import { NavLink, useNavigate } from "react-router-dom";
import ResponsiveComponent from "./ResponsiveComponent";
import ButtonUsage from "./Button";

const Header = ({ admin, userId }) => {
    const navigate = useNavigate();

    return (
        <ResponsiveComponent>
            {({ width, height }) => (
                // mobile

                <header className="
                w-full h-16 bg-primary text-white flex justify-center items-center sticky top-0 left-0 z-50
                ">

                    {/* no user */}
                    <div className="">
                        {/* Home */}
                        <NavLink to="/" className="">
                            <span>
                                <ButtonUsage content={'Home'}></ButtonUsage>
                            </span>
                        </NavLink>
                        {/* Login */}
                        <NavLink to="/login" className="">
                            <span>
                                <ButtonUsage content={'Login'}></ButtonUsage>
                            </span>
                        </NavLink>
                        {/* Register */}
                        <NavLink to="/register" className="">
                            <span>
                                <ButtonUsage content={'Register'}></ButtonUsage>
                            </span>
                        </NavLink>
                    </div>

                    {/* user */}
                    {
                        userId && (
                            <div>
                                <NavLink to="/profile">
                                    <ButtonUsage content={'Profile'}></ButtonUsage>
                                </NavLink>
                                <NavLink to="/logout">
                                    <ButtonUsage content={'Logout'}></ButtonUsage>
                                </NavLink>
                                {/* + list of other pages? to map them for a reusable header component */}
                            </div>
                        )
                    }

                    {/* admin ?with dropdown?*/}
                    {
                        admin && (
                            <div>
                                <NavLink to="/admin">
                                    <ButtonUsage content={'Admin'}></ButtonUsage>
                                </NavLink>
                            </div>
                        )
                    }
                </header>
            )}
        </ResponsiveComponent>

    )
}
export default Header;