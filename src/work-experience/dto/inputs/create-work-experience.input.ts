import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWorkExperienceInput {
  @Field()
  position: string;

  @Field()
  workplace: string;

  @Field({ nullable: true })
  workplaceUrl?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  fromDate: Date;

  @Field()
  toDate: Date;
}
