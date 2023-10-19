import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SocketModule } from 'src/socket/socket.module';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SocketModule],
  controllers: [UsersController],
  providers: [UsersService, SocketGateway],
})
export class UsersModule {}
