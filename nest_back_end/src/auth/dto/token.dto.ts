import { IsString, IsNotEmpty } from '@nestjs/class-validator';

export class TokenDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
