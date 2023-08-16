import express, { json, urlencoded } from 'express';
import routes from './routes';
import cors from 'cors';
import { appDataSource } from './configs/datasource.config';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/v1', routes);
app.use(cors());

appDataSource
  .initialize()
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err);
  });

const admin = require('firebase-admin');

const serviceAccount = require('./configs/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('/api/v1/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Notification sent successfully:', response);
    res.json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Error sending notification' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${process.env.PORT}`,
  );
});
