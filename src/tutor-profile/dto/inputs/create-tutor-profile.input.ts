import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateTutorProfileInput {
  @Field()
  @IsString()
  bio: string;
}
