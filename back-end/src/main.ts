import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from 'http';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create an HTTP server and attach it to the app
  const httpServer = createServer(app.getHttpServer());

  // Attach the Socket.IO adapter to the HTTP server
  app.useWebSocketAdapter(new IoAdapter(httpServer));

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();
