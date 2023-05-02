import { Field, InputType } from '@nestjs/graphql';
import { TutorRequestConnectionType } from '@prisma/client';

@InputType()
export class CreateTutorRequestConnectInput {
  @Field()
  tutorRequestId: string;

  @Field()
  tutorUserId: string;

  @Field()
  tutorId: string;

  @Field()
  type: TutorRequestConnectionType;
}
