import { User } from '@prisma/client';

export class LoginResponse {
  access_token: string;

  user: User;
}
