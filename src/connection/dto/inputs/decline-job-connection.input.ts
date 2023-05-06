import { InputType, PartialType } from '@nestjs/graphql';
import { CreateJobConnectInput } from './create-job-connection.input';

@InputType()
export class DeclineJobConnectionInput extends PartialType(
  CreateJobConnectInput,
) {}
