import { registerEnumType } from '@nestjs/graphql';
import { JobMethod } from '@prisma/client';

registerEnumType(JobMethod, { name: 'JobMethod' });
