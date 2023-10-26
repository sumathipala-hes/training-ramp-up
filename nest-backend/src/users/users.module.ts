import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { SocketModule } from 'src/socket/socket.module';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SocketModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, SocketGateway],
})
export class UsersModule {}
