import * as admin from 'firebase-admin';

const token =
  'd_InpLgdSa6hmihNQRJs4q:APA91bFk_hHmE_iVd_6OwdtQlVXfE5ZvMm6EzV3NflU-Hh4l1oA_B8d2ASaYQutUZ5PUJarj82lAc8mFoW8IJ1gO4pFrJ3Vyx6mNRpJFUvIMlQrnAfN33xBM1jkKSIDU4gKWyLg1dFyM';

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
