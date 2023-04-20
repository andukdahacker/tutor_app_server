import { Field, InputType } from '@nestjs/graphql';
import { TutorRequestConnectionType } from '@prisma/client';
import { GqlTutorRequestConnectionType } from '../entities';

@InputType()
export class CreateTutorRequestConnectInput {
  @Field()
  tutorRequestId: string;

  @Field()
  tutorId: string;

  @Field(() => GqlTutorRequestConnectionType)
  type: TutorRequestConnectionType;
}
