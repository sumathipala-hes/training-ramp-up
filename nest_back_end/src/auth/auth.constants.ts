import { config } from 'dotenv';
config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY!,
  refreshKey: process.env.JWT_REFRESH_KEY!,
  userKey: process.env.JWT_USER_KEY!,
  expiresIn: process.env.JWT_EXPIRES_IN!,
};
