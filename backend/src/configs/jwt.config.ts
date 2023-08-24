import { config } from "dotenv";
config();

export const jwtConfig = {
  secretKey: process.env.SECRET_KEY,
  refreshKey: process.env.REFRESH_KEY,
  userKey: process.env.USER_KEY,
  expiresIn: process.env.EXPIRES_IN,
};
