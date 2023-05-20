import { InputType, PartialType } from '@nestjs/graphql';
import { Education } from '../entities';

@InputType()
export class UpdateEducationInput extends PartialType(Education, InputType) {}
