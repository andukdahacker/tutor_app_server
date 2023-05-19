import { registerEnumType } from '@nestjs/graphql';
import { JobType } from '@prisma/client';

registerEnumType(JobType, { name: 'JobType' });
