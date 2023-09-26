/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod} from "@nestjs/common"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./entities/user.entity"
import { JwtService } from "@nestjs/jwt"
import { AuthMiddleware } from "src/middleware/auth.middleware"
import { RefreshMiddleware } from "src/middleware/refresh.middleware"

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, JwtService],
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({
            path: '/userAuth',
            method: RequestMethod.GET,
        });
        consumer.apply(RefreshMiddleware).forRoutes({
            path: '/refresh',
            method: RequestMethod.GET,
        })
    }
}