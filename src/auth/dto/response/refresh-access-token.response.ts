import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshAccessTokenResponse {
  @Field(() => String)
  access_token: string;
}
