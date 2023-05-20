import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Education } from '../entities';

@InputType()
export class CreateEducationInput extends PartialType(
  OmitType(Education, ['id'] as const),
  InputType,
) {}
