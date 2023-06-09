import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserEventInput {
  @Field()
  jobId: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;
}
