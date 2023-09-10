import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './configs/db.config';

@Module({
  imports: [StudentModule, TypeOrmModule.forRoot(dataSource), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
