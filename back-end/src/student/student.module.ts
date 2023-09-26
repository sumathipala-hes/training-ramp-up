// student.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../models/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SocketModule } from 'src/socket/socket.module';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), SocketModule],
  providers: [StudentService, SocketGateway],
  exports: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
