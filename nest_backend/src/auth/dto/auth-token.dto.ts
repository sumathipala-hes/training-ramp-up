import { IsNotEmpty, IsString } from 'class-validator';

export class TokenPayloadDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
