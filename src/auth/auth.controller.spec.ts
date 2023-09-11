import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let resolver: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthController, AuthService],
    }).compile();

    resolver = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
