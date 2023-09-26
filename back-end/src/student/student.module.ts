// student.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../models/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), SocketModule],
  providers: [StudentService],
  exports: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
