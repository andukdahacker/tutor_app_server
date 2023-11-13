import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignUpInput {
  @ApiProperty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
