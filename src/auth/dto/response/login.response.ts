import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/dto/entity/user.entity';

export class LoginResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;
}
