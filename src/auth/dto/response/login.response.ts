import { User } from '@prisma/client';

import { BaseResponse } from 'src/shared/types/base_response';

class LoginData {
  access_token: string;

  user: User;
}

export type LoginResponse = BaseResponse<LoginData>;
