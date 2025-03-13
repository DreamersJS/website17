import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userAtom";
import ButtonUsage from "./Button";
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, Menu, MenuItem, Divider, List, ListItem, ListItemText } from '@mui/material';
import ResponsiveComponent from './ResponsiveComponent'; // Import your responsive component

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false); // Handles mobile menu
    const [anchorEl, setAnchorEl] = useState(null); // Handles profile/admin menu dropdown
    const [menuType, setMenuType] = useState(''); // To track which menu is open (profile, admin)
    const [openSearch, setOpenSearch] = useState(false); // To handle the search input visibility
    const user = useRecoilValue(userState);
    const userId = user?.id;
    const admin = user?.role;

    // Open Menu
    const handleMenuOpen = (event, type) => {
        setAnchorEl(event.currentTarget);
        setMenuType(type); // Set the menu type (either 'profile' or 'admin')
    };

    // Close Menu
    const handleClose = () => {
        setAnchorEl(null);
        setMenuType(''); // Reset menu type when closing
    };

    const toggleSearch = () => {
        setOpenSearch(!openSearch);
    };

    const toggleDrawer = (open) => () => {
        setOpenMenu(open);
    };

    return (
        <ResponsiveComponent>
    {({ width }) => (
        <AppBar position="sticky" sx={{ backgroundColor: '#177F2E', zIndex: 50 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Left section: Logo/Home */}
                <Box display="flex" alignItems="center">
                    <NavLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <HomeIcon sx={{ fontSize: 30, color: '#FFF', marginRight: 1 }} />

                        {/* Conditionally render the text based on screen width */}
                        {width > 805 && (
                            <Typography variant="h6" sx={{ color: '#FFF' }}>
                                Home
                            </Typography>
                        )}
                    </NavLink>
                </Box>

                {/* Desktop Navigation Links */}
                <Box display={{ xs: 'none', sm: 'flex' }} justifyContent="center" flexGrow={1}>
                    {!userId && (
                        <>
                            <NavLink to="/login" style={{ margin: width <= 805 ? '0 3px' : '0 10px' }}>
                                <ButtonUsage content="Login" />
                            </NavLink>
                            <NavLink to="/register" style={{ margin: width <= 805 ? '0 3px' : '0 10px' }}>
                                <ButtonUsage content="Register" />
                            </NavLink>
                        </>
                    )}
                    {userId && (
                        <>
                            {/* Profile with Logout submenu */}
                            <Box display="flex" alignItems="center" sx={{ margin: width <= 805 ? '0 3px' : '0 10px' }}>
                                <ButtonUsage content="Profile" onClick={(e) => handleMenuOpen(e, 'profile')}  aria-haspopup="menu" aria-expanded={menuType === 'profile' ? 'true' : 'false'} />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={menuType === 'profile'}
                                    onClose={handleClose}
                                >
                                    <MenuItem component={NavLink} to="/profile" onClick={handleClose}>
                                        Profile
                                    </MenuItem>
                                    <Divider />
                                    {/* can submit Results for testimonials, marathons(who can verify the results? само клиенти 'на живо' могат да събмитнат?); take them from Diary logic like DirectChat-ChannelChat */}
                                    <MenuItem component={NavLink} to="/results" onClick={handleClose}>
                                        Results
                                    </MenuItem>
                                    <Divider />
                                    {/* tabliza moeto hranene?  */}
                                    <MenuItem component={NavLink} to="/diary" onClick={handleClose}>
                                        Diary
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem component={NavLink} to="/logout" onClick={handleClose}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    )}

                    {/* Admin with submenu */}
                    {admin && (
                        <Box display="flex" alignItems="center" sx={{ margin: width <= 805 ? '0 3px' : '0 10px' }}>
                            <ButtonUsage content="Admin" onClick={(e) => handleMenuOpen(e, 'admin')}  aria-haspopup="menu" aria-expanded={menuType === 'admin' ? 'true' : 'false'} />
                            <Menu
                                anchorEl={anchorEl}
                                open={menuType === 'admin'}
                                onClose={handleClose}
                            >
                                <MenuItem component={NavLink} to="/admin" onClick={handleClose}>
                                    Admin
                                </MenuItem>
                                {/* <Divider />
                                <MenuItem component={NavLink} to="/block" onClick={handleClose}>
                                    Block Users
                                </MenuItem> */}
                            </Menu>
                        </Box>
                    )}

                    {/* Available to all users */}
                    <NavLink to="/coach" style={{ margin: width <= 805 ? '0 3px' : '0 10px' }}>
                        <ButtonUsage content="Coaches" />
                    </NavLink>
                    <NavLink to="/testimonials" style={{ margin: width <= 805 ? '0 3px' : '0 10px' }}>
                        <ButtonUsage content="Testimonials" />
                    </NavLink>
                    <NavLink to="/products" style={{ margin: width <= 805 ? '0 3px' : '0 10px' }}>
                        <ButtonUsage content="Products" />
                    </NavLink>

                    {/* Search Bar with Button */}
                    <Box display="flex" alignItems="center" sx={{ marginLeft: 2 }}>
                        <IconButton onClick={toggleSearch}>
                            <SearchIcon sx={{ color: '#FFF' }} />
                        </IconButton>
                        {openSearch && (
                            <input
                                type="text"
                                placeholder="Search..."
                                style={{
                                    backgroundColor: '#FFF',
                                    borderRadius: '4px',
                                    padding: '5px 10px',
                                    width: '200px'
                                }}
                            />
                        )}
                    </Box>
                </Box>

                {/* Mobile Menu Icon */}
                <Box display={{ xs: 'flex', sm: 'none' }}>
                    <IconButton onClick={toggleDrawer(true)} aria-label="Open mobile navigation menu">
                        <MenuIcon sx={{ color: '#FFF' }} />
                    </IconButton>
                    {/* Search Bar with Button */}
                    <Box display="flex" alignItems="center" sx={{ marginLeft: 2 }}>
                        <IconButton onClick={toggleSearch}>
                            <SearchIcon sx={{ color: '#FFF' }} />
                        </IconButton>
                        {openSearch && (
                            <input
                                type="text"
                                placeholder="Search..."
                                aria-label="Search input"
                                style={{
                                    backgroundColor: '#FFF',
                                    borderRadius: '4px',
                                    padding: '5px 10px',
                                    width: '200px'
                                }}
                            />
                        )}
                    </Box>
                </Box>

            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" aria-label="Mobile navigation menu" open={openMenu} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem button component={NavLink} to="/">
                            <ListItemText primary="Home" />
                        </ListItem>

                        {userId ? (
                            <>
                                <ListItem button component={NavLink} to="/profile">
                                    <ListItemText primary="Profile" />
                                </ListItem>
                                <ListItem button component={NavLink} to="/logout">
                                    <ListItemText primary="Logout" />
                                </ListItem>
                                <ListItem button component={NavLink} to="/coach">
                                    <ListItemText primary="Coaches" />
                                </ListItem>
                                <ListItem button component={NavLink} to="/testimonials">
                                    <ListItemText primary="Testimonials" />
                                </ListItem>
                                <ListItem button component={NavLink} to="/products">
                                    <ListItemText primary="Products" />
                                </ListItem>
                                {/* <ListItem button component={NavLink} to="/shop">
                                    <ListItemText primary="Shop" />
                                </ListItem> */}
                            </>
                        )
                            :
                            (
                                <>
                                    <ListItem button component={NavLink} to="/login">
                                        <ListItemText primary="Login" />
                                    </ListItem>
                                    <ListItem button component={NavLink} to="/register">
                                        <ListItemText primary="Register" />
                                    </ListItem>
                                </>
                            )}
                        {admin && (
                            <ListItem button component={NavLink} to="/admin">
                                <ListItemText primary="Admin" />
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>
            </AppBar>
    )}
</ResponsiveComponent>
    );
};

export default Header;