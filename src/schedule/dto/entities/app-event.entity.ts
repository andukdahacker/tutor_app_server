import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AppEvent {
  @Field()
  id: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;
}
