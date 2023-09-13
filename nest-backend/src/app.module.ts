import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import typeOrmConfig from './config/typeorm.config';
import { authPermissions, authorization } from './auth/auth.middleware';

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
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authPermissions)
      .forRoutes({ path: 'api/v1/user/add', method: RequestMethod.POST });
    consumer
      .apply(authPermissions)
      .forRoutes({ path: 'api/v1/user/:id', method: RequestMethod.PUT });
    consumer
      .apply(authPermissions)
      .forRoutes({ path: 'api/v1/user/del', method: RequestMethod.DELETE });
    consumer
      .apply(authorization)
      .forRoutes({ path: 'api/v1/user/signOut', method: RequestMethod.DELETE });
  }
}
