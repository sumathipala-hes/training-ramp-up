import dotenv from 'dotenv';
dotenv.config();
import { createCipheriv, createDecipheriv } from 'node:crypto';

const encryptionKey = process.env.ENCRYPTION_KEY?? '';
const iv = process.env.ENCRYPTION_IV?? '';

export const encrypt = (data: string): string => {
  const cipher = createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
};

export const decrypt = (data: string): string => {
  const decipher = createDecipheriv('aes-256-cbc', encryptionKey, iv);
  let decryptedData = decipher.update(data, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return decryptedData;
};
