import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateLearnerProfileInput {
  @Field()
  @IsString()
  bio: string;
}
