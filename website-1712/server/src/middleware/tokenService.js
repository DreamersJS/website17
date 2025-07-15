import bcrypt from 'bcrypt';
import crypto from 'crypto';
import redisClient from '../config/redisClient.js';

const salt = 10;

export const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

export const hashToken = async (token) => {
    return await bcrypt.hash(token, salt);
};

export const verifyToken = async (email, token) => {
    // Generate the hashed token key to retrieve the stored token from Redis
    const hashedToken = await redisClient.get(`confirm_tokens:${await hashToken(token)}`);

    if (!hashedToken) {
        throw new Error('Token expired or does not exist');
    }

    // Parse the stored data from Redis (it should contain the email and expiration time)
    const storedData = JSON.parse(hashedToken);

    // Check if the token is expired
    if (Date.now() > storedData.expiresAt) {
        throw new Error('Token has expired');
    }

    // Ensure the email in the request matches the email associated with the token
    if (storedData.email !== email) {
        throw new Error('Invalid email for this token');
    }

    // Token and email are valid, remove the token from Redis as it's now been used
    await redisClient.del(`confirm_tokens:${await hashToken(token)}`);

    console.log('Email verified successfully!');
};
