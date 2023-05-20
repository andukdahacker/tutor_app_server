import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateWorkExperienceInput } from './create-work-experience.input';

@InputType()
export class UpdateWorkExperienceInput extends PartialType(
  CreateWorkExperienceInput,
) {
  @Field()
  workExperienceId: string;
}
