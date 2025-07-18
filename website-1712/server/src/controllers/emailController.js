import redisClient, { connectRedis } from '../config/redisClient.js';
import { rateLimiter } from '../middleware/rateLimiter.js';
import { generateToken, hashToken } from '../middleware/tokenService.js';
import dns from 'dns';
import nodemailer from 'nodemailer';

// List of known email providers
const knownDomains = new Set([
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'abv.bg',
    'mail.bg',
]);

export async function checkDomainMxRecords(req, res) {
    const { email } = req.body;

    if (typeof email !== 'string' || !email.includes('@')) {
        console.log('Invalid email format');
        return res.status(400).json({ valid: false, reason: 'Invalid email format' });
    }

    const domain = email.split('@')[1];

    if (!domain) {
        console.log('Email does not contain domain');
        return res.status(400).json({ valid: false, reason: 'Missing domain' });
    }

    if (!knownDomains.has(domain)) {
        console.log(`Unknown or uncommon domain: ${domain}`);
        return res.status(200).json({ valid: false, reason: 'Unknown or uncommon domain' });
    }

    try {
        const addresses = await dns.promises.resolveMx(domain);

        if (addresses.length > 0) {
            console.log('Valid domain with MX records');
            return res.status(200).json({ valid: true });
        } else {
            console.log('No MX records found');
            return res.status(200).json({ valid: false, reason: 'No MX records' });
        }
    } catch (error) {
        console.log(`DNS lookup failed for ${domain}: ${error.message}`);
        return res.status(500).json({ valid: false, reason: 'DNS lookup failed' });
    }
}

export const sendConfirmationEmailController = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(`Received email for confirmation: ${email}`);

        await connectRedis();

        const token = generateToken();
        console.log(`Generated token for email confirmation: ${token}`);

        const expiresAt = Date.now() + 3600 * 1000;

        await redisClient.setEx(
            `confirm_tokens:${token}`,
            3600,
            JSON.stringify({ email, expiresAt })
        );

        const storedToken = await redisClient.get(`confirm_tokens:${token}`);
        console.log('Token stored in Redis:', storedToken);

        // const confirmationLink = `${process.env.APP_URL}/api/confirmEmail?token=${token}&email=${email}`;
        const confirmationLink = `${process.env.FRONTEND_URL}/confirm?token=${token}&email=${email}`;
        console.log(`Confirmation link: ${confirmationLink}`);

        const subject = 'Confirm your email address';
        const text = `Please confirm your email by clicking the link: ${confirmationLink}`;

        await sendEmail({ to: email, subject, text });

        return res.status(200).json({ message: 'Confirmation email sent!' });

    } catch (error) {
        console.error('Error in sendConfirmationEmailController:', error);
        return res.status(500).json({ message: 'Failed to send confirmation email.' });
    }
};

export const confirmEmail = async (req, res) => {
    await connectRedis();

    const { token, email } = req.query;

    if (!token || !email) {
        return res.status(400).json({ message: 'Missing token or email' });
    }

    try {
        const storedStrToken = await redisClient.get(`confirm_tokens:${token}`);
        if (!storedStrToken) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const { email: storedEmail, expiresAt } = JSON.parse(storedStrToken);

        // Check if token is tied to this email
        if (email !== storedEmail) {
            return res.status(400).json({ message: 'Email does not match token' });
        }

        // Check if token is expired
        if (Date.now() > expiresAt) {
            return res.status(400).json({ message: 'Token expired' });
        }

        // Confirm email
        await redisClient.set(`confirmed:${email}`, 'true', { EX: 86400 });
        await redisClient.del(`confirm_tokens:${token}`);

        return res.status(200).json({
            message: 'Email confirmed successfully. You may now send your message.',
            confirmed: true,
            email
        });

    } catch (err) {
        console.error('Confirmation error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const isConfirmed = async (req, res) => {
    await connectRedis();

    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: 'Missing email' });
    }
    try {
        const isConfirmed = await redisClient.get(`confirmed:${email}`);
        return res.status(200).json({ confirmed: Boolean(isConfirmed) });
    } catch (error) {
        console.error('isConfirmed error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const sendMsgController = async (req, res) => {
    try {
        await connectRedis();
        const { name, email, phone, message, subject = 'New Contact Form Message' } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Recipient email is required.' });
        }

        const isConfirmed = await redisClient.get(`confirmed:${email}`);
        if (!isConfirmed) {
            return res.status(400).json({ message: 'Email not confirmed yet' });
        }

        await sendEmail({
            to: email,
            subject,
            text: `${message}\n\nFrom:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}`
        });

        return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error in sendMsgController:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export async function sendEmail({ to, subject = 'Email Confirmation', text }) {
    const transporter = nodemailer.createTransport({
        host: process.env.ETHEREAL_HOST || 'smtp.ethereal.email',
        port: process.env.ETHEREAL_PORT || 587,
        secure: false,
        auth: {
            user: process.env.ETHEREAL_USER,
            pass: process.env.ETHEREAL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.ETHEREAL_USER,
        to,
        subject,
        text,
    });

    console.log('Email sent. Preview URL:', nodemailer.getTestMessageUrl(info));
    return info;
}