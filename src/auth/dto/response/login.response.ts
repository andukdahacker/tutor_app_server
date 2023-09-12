import { BaseResponse } from 'src/shared/types/base_response';
import { UserEntity } from 'src/user/dto/entity/user.entity';

class LoginData {
  access_token: string;

  user: UserEntity;
}

export type LoginResponse = BaseResponse<LoginData>;
