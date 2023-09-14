/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { Student } from "./entities/student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthMiddleware } from "src/middleware/auth.middleware";
import { AdminAccess } from "src/middleware/admin.access.middleware";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
    controllers: [StudentController],
    providers: [StudentService, JwtService, Repository],
})

export class StudentModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware, AdminAccess).forRoutes('/students');
    }
}
