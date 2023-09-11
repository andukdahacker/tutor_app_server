import { Test, TestingModule } from '@nestjs/testing';
import { JobConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';

describe('ConnectionResolver', () => {
  let resolver: JobConnectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobConnectionController, ConnectionService],
    }).compile();

    resolver = module.get<JobConnectionController>(JobConnectionController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
