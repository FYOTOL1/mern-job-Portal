import jwt from 'jsonwebtoken';

const KEY = (process.env.SECRET_JWT_KEY as string) || "ahmedahmosahmedaos12212";
const REFRESH_KEY = (process.env.REFRESH_TOKEN_SECRET as string) || "refreshSecretKey12345";

export const generateAccessToken = (userId: string) => {
    return jwt.sign({ userId }, KEY, { expiresIn: '15m' }); 
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, REFRESH_KEY, { expiresIn: '7d' });
};
