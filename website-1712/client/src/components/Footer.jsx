import { Box, Typography, Link, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

// #06210c   #062001  #051901 
const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#051901', color: 'white', padding: '1rem 0' }}>
            <Grid container spacing={2} justifyContent="center">
                {/* Navigation Links */}
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom>
                        Quick Links
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <Link href="/" color="inherit" underline="hover" sx={{ fontSize: '0.875rem' }}>
                            Home
                        </Link>
                        <Link href="/about" color="inherit" underline="hover" sx={{ fontSize: '0.875rem' }}>
                            About Us
                        </Link>
                        <Link href="/contact" color="inherit" underline="hover" sx={{ fontSize: '0.875rem' }}>
                            Contact Us
                        </Link>
                        <Link href="/privacy" color="inherit" underline="hover" sx={{ fontSize: '0.875rem' }}>
                            Privacy Policy
                        </Link>
                    </Box>
                </Grid>

                {/* Contact Information */}
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="body2">
                        Email: <Link href="mailto:info@example.com" color="inherit">info@example.com</Link>
                    </Typography>
                    <Typography variant="body2">
                        Phone: <Link href="tel:+1234567890" color="inherit">+1 (234) 567-890</Link>
                    </Typography>
                    <Typography variant="body2">
                        Address: 123 Main Street, City, Country
                    </Typography>
                </Grid>

                {/* Social Media Links */}
                <Grid item xs={12} sm={12} md={4}>
                    <Typography variant="subtitle1" gutterBottom>
                        Follow Us
                    </Typography>
                    <Box display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center" gap="0.5rem">
                        <Link href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" sx={{ fontSize: '0.875rem' }}>
                            <span>
                                <FacebookIcon style={{ fontSize: 24, marginRight: 8, color: '#fff' }} />
                            </span>
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" rel="noopener" aria-label="Linkedin" sx={{ fontSize: '0.875rem' }}>
                            <span>
                                <LinkedInIcon style={{ fontSize: 24, marginRight: 8, color: '#fff' }} />
                            </span>
                        </Link>
                        <Link href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" sx={{ fontSize: '0.875rem' }}>
                            <span>
                                <TwitterIcon style={{ fontSize: 24, marginRight: 8, color: '#fff' }} />
                            </span>
                        </Link>
                    </Box>
                </Grid>
            </Grid>

            {/* Bottom Bar */}
            <Box textAlign="center" marginTop="2rem">
                <Typography variant="body2">
                    © {new Date().getFullYear()} Example Company. All rights reserved.
                </Typography>
            </Box>
        </footer>
    );
};

export default Footer;
