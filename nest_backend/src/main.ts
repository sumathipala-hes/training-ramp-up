import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { serviceAccount } from './config/firebase.config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  await app.listen(5000);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
bootstrap();
