import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';

@Module({
  imports: [StudentsModule, TypeOrmModule.forRoot(typeOrmConfig),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
