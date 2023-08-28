import dotenv from 'dotenv';
dotenv.config();

export const jwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY!,
  refreshKey: process.env.JWT_REFRESH_KEY!,
  userKey: process.env.JWT_USER_KEY!,
  expiresIn: process.env.JWT_EXPIRES_IN!,
};
