import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SocketModule } from 'src/socket/socket.module';
import { SocketService } from 'src/socket/socket.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), SocketModule],
  controllers: [StudentsController],
  providers: [StudentsService, SocketGateway],
})
export class StudentsModule {}
