import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  // Initialize the Firebase Admin SDK using your serviceAccount credentials
  admin.initializeApp({
    credential: admin.credential.cert(configService.getFirebaseAdminConfig()),
  });

  await app.listen(4000);
}
bootstrap();
