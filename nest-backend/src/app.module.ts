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
    consumer.apply(StudentMiddleware).forRoutes({path: 'student', method: RequestMethod.POST});
    consumer.apply(StudentMiddleware).forRoutes({path: 'student', method: RequestMethod.PUT});
    consumer.apply(authPermissions).forRoutes({path: 'user/add', method: RequestMethod.POST});
    consumer.apply(authPermissions).forRoutes({path: 'user/update', method: RequestMethod.PUT});
    consumer.apply(authPermissions).forRoutes({path: 'user', method: RequestMethod.GET});
    consumer.apply(authPermissions).forRoutes({path: 'user/del', method: RequestMethod.DELETE});
  }
}
