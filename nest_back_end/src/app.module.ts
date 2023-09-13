import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './configs/db.config';
import { AuthModule } from './auth/auth.module';

@Module({
  
  imports: [StudentModule, TypeOrmModule.forRoot(dataSource), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
