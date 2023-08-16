import axios from "axios";

const token = 'd_InpLgdSa6hmihNQRJs4q:APA91bFk_hHmE_iVd_6OwdtQlVXfE5ZvMm6EzV3NflU-Hh4l1oA_B8d2ASaYQutUZ5PUJarj82lAc8mFoW8IJ1gO4pFrJ3Vyx6mNRpJFUvIMlQrnAfN33xBM1jkKSIDU4gKWyLg1dFyM';

const serverKey = process.env.API_SERVER_KEY || '';
const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';

export const sendNotification = async (title: string, body: string) => {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        to: token,
    };

    try {
        const res = await axios.post(fcmEndpoint, message, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `key=${serverKey}`,
            },
        });

        console.log('Notification sent:', res.data);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}
