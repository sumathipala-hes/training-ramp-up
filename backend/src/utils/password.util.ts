import { createCipheriv, createDecipheriv } from 'node:crypto';

const encryptionKey = '12345678901234567890123456789012';
const iv = '1234567890123456';

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
