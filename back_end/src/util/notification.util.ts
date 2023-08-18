import * as admin from 'firebase-admin';
const token = '';

export const sendNotification = async (title: string, body: string) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    admin.messaging().send(message);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
