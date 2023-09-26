import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { StudentModule } from './student/student.module';
import { SocketModule } from './socket/socket.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, StudentModule, SocketModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
