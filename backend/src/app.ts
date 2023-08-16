import { config } from 'dotenv';
config();
import express from 'express';
import routes from './routes';
import { dataSource } from './configs/dataSourceConfig';
import cors from 'cors';
import * as admin from 'firebase-admin';
import axios from 'axios';
const serviceAccount = require('./utils/service.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

dataSource
  .initialize()
  .then(() => {
    console.log('The database is connected!');
  })
  .catch((error) => {
    console.log('The database connection failed!');
    console.log(error);
  });

app.listen(process.env.APP_PORT, () => {
  console.log(
    `The application is listening on port ${process.env.APP_PORT}..!`
  );
});



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('/notification', async (req, res) => {
  const { token, title, body } = req.body;

  const serverKey = process.env.API_SERVER_KEY || '';
  const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';

  console.log('Token:', token);

  const message = {
    notification: {
      title: title,
      body: body,
    },

    to: token,
  };

  try {
    const response = await axios.post(fcmEndpoint, message, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${serverKey}`,
      },
    });

    console.log('Notification sent:', response.data);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});
