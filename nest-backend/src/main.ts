import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as admin from 'firebase-admin';
import { serviceAccount } from './config/firebase.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  await app.listen(5000);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
bootstrap();
