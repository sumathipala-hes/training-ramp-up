import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import typeOrmConfig from './config/typeorm.config';
import { StudentMiddleware } from './students/student.middleware';
import { authPermissions } from './auth/auth.middleware';
import { validateUser } from './users/user.middleware';

@Module({
  imports: [
    StudentsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer) {
    consumer.apply(StudentMiddleware).forRoutes({path: 'api/v1/student', method: RequestMethod.POST});
    consumer.apply(StudentMiddleware).forRoutes({path: 'api/v1/student', method: RequestMethod.PUT});
    consumer.apply(authPermissions).forRoutes({path: 'api/v1/user/add', method: RequestMethod.POST});
    consumer.apply(authPermissions).forRoutes({path: 'api/v1/user/:id', method: RequestMethod.PUT});
    // consumer.apply(authPermissions).forRoutes({path: 'api/v1/user/signIn', method: RequestMethod.GET});
    consumer.apply(authPermissions).forRoutes({path: 'api/v1/user/del', method: RequestMethod.DELETE});
    consumer.apply(validateUser).forRoutes({path: 'api/v1/user/add', method: RequestMethod.POST});
    consumer.apply(validateUser).forRoutes({path: 'api/v1/user/:id', method: RequestMethod.PUT});
  }
}
