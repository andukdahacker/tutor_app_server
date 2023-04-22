import { InputType, PartialType } from '@nestjs/graphql';
import { CreateLearnerProfileInput } from './create-learner-profile.input';

@InputType()
export class UpdateLearnerProfileInput extends PartialType(
  CreateLearnerProfileInput,
) {}
