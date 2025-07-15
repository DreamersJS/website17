import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Container } from '@mui/material';
import { useFeedback } from '../hoc/FeedbackContext.jsx';
import { checkDomain, emailSendConfirmationEmail, emailSendMsg, checkEmailConfirmed } from '../../service/service-email.js';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { showFeedback } = useFeedback();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const verifyDomain = await checkDomain(email)
            const verifyEmail = await emailSendConfirmationEmail(email)
            if (verifyEmail.ok) showFeedback(`Confirmation email sent. Please confirm before messaging.`, 'info');
            // STOP here - let user confirm, then enable form again or redirect them.
            // const isConfirmed = await checkEmailConfirmed(email);
            // if (!isConfirmed) {
            //     showFeedback("Email not confirmed yet. Please check your inbox.", 'error');
            //     return;
            // }
            const emailConfirmedResp = await checkEmailConfirmed(email);
            const isConfirmed = emailConfirmedResp?.confirmed;

            if (!isConfirmed) {
                await emailSendConfirmationEmail(email);
                showFeedback(`Confirmation email sent. Please confirm before messaging.`, 'info');
                return;
            }
            const sendMsg = await emailSendMsg(name, email, phone, message);
            showFeedback('Message sent!', 'success');
        } catch (error) {
            showFeedback(`${error}`, 'error');
            return;
        } finally {
            setLoading(false);
        }
    };
    return (
        <Container maxWidth="sm" sx={{ marginTop: 8 }}>
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Contact
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
                    To contact us please use the following options:

                    Name Name – Independent Herbalife Member
                    Phone: +359111111111
                    Email: @gmail.com
                    Address: Sofia, Bulgaria

                    If you have any questions or need assistance, please fill out the form below.
                </Typography>
            </Box>
            <Box
                component="form"
                role="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    backgroundColor: '#fff',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <TextField
                    id="name"
                    label="name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    id="phone"
                    label="phone"
                    type="phone"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <TextField
                    id="message"
                    label="message"
                    type="message"
                    variant="outlined"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={loading}
                        sx={{
                            padding: '10px 20px',
                            backgroundColor: '#177F2E',
                            '&:hover': { backgroundColor: '#0b4017' },
                        }}
                    >
                        {loading ? (
                            <>
                                <CircularProgress size={24} sx={{ color: 'white', marginRight: 2 }} />
                                Sending...
                            </>
                        ) : (
                            'Send'
                        )}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
export default Contact;