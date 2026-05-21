import jwt from "jsonwebtoken";
import{ ACCESS_SECRET }from "../config/env.js";
import{ REFRESH_SECRET}from "../config/env.js"; 

export const generateAccessToken = (user) => {
    const accessToken = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
            isBlocked: user.isBlocked,
        },
        ACCESS_SECRET,
        { expiresIn: "15m" },
    );
    return accessToken;
}

export const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(
        {
            userId: user.id
        },
        REFRESH_SECRET,
        { expiresIn: "7d" }
    );
    return refreshToken;
}