import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConfig } from '../config/jwt.config';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConfig.secretKey,
      signOptions: { expiresIn: jwtConfig.accessExpiresIn },
    }),
  ],
  providers: [AuthService, { provide: APP_GUARD, useClass: RolesGuard }],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
