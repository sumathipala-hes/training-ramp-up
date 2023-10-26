import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SocketModule } from 'src/socket/socket.module';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), SocketModule // Import the repository here
  ],
  controllers: [UserController],
  providers: [UserService, SocketGateway],
})
export class UserModule {}
