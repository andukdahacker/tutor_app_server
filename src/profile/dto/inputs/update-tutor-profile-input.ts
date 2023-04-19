import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTutorProfileInput } from './create-tutor-profile.input';

@InputType()
export class UpdateTutorProfileInput extends PartialType(
  CreateTutorProfileInput,
) {}
