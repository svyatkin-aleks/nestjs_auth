import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}
