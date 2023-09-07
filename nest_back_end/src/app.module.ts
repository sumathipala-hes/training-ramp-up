import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [StudentModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
