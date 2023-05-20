import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Education {
  @Field()
  id: string;

  @Field()
  educationEntity: string;

  @Field({ nullable: true })
  educationEntityUrl?: string;

  @Field()
  fromDate: Date;

  @Field()
  toDate: Date;

  @Field({ nullable: true })
  description?: string;
}
