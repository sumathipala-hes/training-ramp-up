import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use the cookieParser middleware
  app.use(cookieParser());

  // Attach the Socket.IO adapter to the HTTP server
  app.useWebSocketAdapter(new IoAdapter(app));

  // Enable CORS
  app.enableCors({
    origin: process.env.ORIGIN,
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();
