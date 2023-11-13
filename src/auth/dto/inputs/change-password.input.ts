import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordInput {
  @ApiProperty()
  token: string;

  @ApiProperty()
  password: string;
}
