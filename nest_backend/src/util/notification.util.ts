import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();

const token = process.env.API_TOKEN;

export const sendNotification = async (title: string, body: string) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token || '',
  };

  try {
    admin.messaging().send(message);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
