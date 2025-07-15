import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const ConfirmEmail = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (!token || !email) {
            setMessage('Invalid confirmation link.');
            setLoading(false);
            return;
        }

        const confirmEmail = async () => {
            try {
                const res = await fetch(`/api/email/confirmEmail?token=${token}&email=${email}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to confirm email');

                setSuccess(true);
                setMessage('Email confirmed successfully. You can now send messages.');
            } catch (err) {
                setMessage(`❌ ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        confirmEmail();
    }, [searchParams]);

    return (
        <Container maxWidth="sm" sx={{ marginTop: 8, textAlign: 'center' }}>
            {loading ? (
                <Box>
                    <CircularProgress />
                    <Typography>Confirming your email...</Typography>
                </Box>
            ) : (
                <Typography variant="h6" color={success ? 'green' : 'error'}>
                    {message}
                </Typography>
            )}
        </Container>
    );
};

export default ConfirmEmail;
