import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WorkExperience {
  @Field()
  id: string;

  @Field()
  position: string;

  @Field()
  workplace: string;

  @Field({ nullable: true })
  workplaceUrl?: string;

  @Field()
  fromDate: Date;

  @Field()
  toDate: Date;
}
