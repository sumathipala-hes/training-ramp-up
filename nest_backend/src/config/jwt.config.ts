import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY!,
  refreshKey: process.env.JWT_REFRESH_KEY!,
  userKey: process.env.JWT_USER_KEY!,
  accessExpiresIn: process.env.JWT_SECRET_EXPIRES_IN!,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
};
