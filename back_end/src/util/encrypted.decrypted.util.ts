import { createCipheriv, createDecipheriv } from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

const keyString = process.env.ENCRYPTION_KEY!;
const iv = process.env.ENCRYPTED_IV!;

export const encryptPassword = (password: string): string => {
  const cipher = createCipheriv('aes-256-cbc', keyString, iv);
  let encryptedPassword = cipher.update(password, 'utf8', 'base64');
  encryptedPassword += cipher.final('base64');
  return encryptedPassword;
};

export const decryptPassword = (encryptedPassword: string): string => {
  const decipher = createDecipheriv('aes-256-cbc', keyString, iv);
  let decryptedPassword = decipher.update(encryptedPassword, 'base64', 'utf8');
  decryptedPassword += decipher.final('utf8');
  return decryptedPassword;
};
