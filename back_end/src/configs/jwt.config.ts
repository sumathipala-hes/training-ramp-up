import { config } from 'dotenv';
config();

interface JwtConfig {
  secretKey: string;
  refreshKey: string;
  userKey: string;
  expiresIn: string;
}

export const jwtConfig: JwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY!,
  refreshKey: process.env.JWT_REFRESH_KEY!,
  userKey: process.env.JWT_USER_KEY!,
  expiresIn: process.env.JWT_EXPIRES_IN!,
};
