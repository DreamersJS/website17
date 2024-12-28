import { NavLink, useNavigate } from "react-router-dom";
import ResponsiveComponent from "./ResponsiveComponent";
import ButtonUsage from "./Button";
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ admin, userId }) => {
    const navigate = useNavigate();

    return (
        <ResponsiveComponent>
            {({ width, height }) => (
                <header className="
                w-full h-16 bg-primary text-white flex justify-center items-center sticky top-0 left-0 z-50
                ">
                    {width < 500 ? (
                        <MenuIcon />
                    ) : (
                        <div>
                            {/* No user */}
                            <div>
                                <NavLink to="/">
                                    <span>
                                        <HomeIcon sx={{ fontSize: 30, color: '#177F2E' }} />
                                        <ButtonUsage content="Home" />
                                    </span>
                                </NavLink>
                                <NavLink to="/login">
                                    <span>
                                        <ButtonUsage content="Login" />
                                    </span>
                                </NavLink>
                                <NavLink to="/register">
                                    <span>
                                        <ButtonUsage content="Register" />
                                    </span>
                                </NavLink>
                            </div>

                            {/* User */}
                            {userId && (
                                <div>
                                    <NavLink to="/profile">
                                        <ButtonUsage content="Profile" />
                                    </NavLink>
                                    <NavLink to="/logout">
                                        <ButtonUsage content="Logout" />
                                    </NavLink>
                                    <NavLink to="/coach">
                                        <ButtonUsage content="Coaches" />
                                    </NavLink>
                                    <NavLink to="/testimonials">
                                        <ButtonUsage content="Testimonials" />
                                    </NavLink>
                                </div>
                            )}

                            {/* Admin */}
                            {admin && (
                                <div>
                                    <NavLink to="/admin">
                                        <ButtonUsage content="Admin" />
                                    </NavLink>
                                </div>
                            )}

                            {/* Internationalization */}
                        </div>
                    )}
                </header>
            )}
        </ResponsiveComponent>
    );
};

export default Header;
