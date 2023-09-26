/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { Student } from "./entities/student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { SocketModule } from "src/socket/socket.module";
import { RolesGuard } from "src/auth/role.guard";

@Module({
    imports: [TypeOrmModule.forFeature([Student]), SocketModule],
    controllers: [StudentController],
    providers: [StudentService, JwtService, Repository, RolesGuard],
})

export class StudentModule {}
