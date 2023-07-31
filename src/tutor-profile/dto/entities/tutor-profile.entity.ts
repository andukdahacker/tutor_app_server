import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { JobConnection } from 'src/connection/dto/entities';
import { User } from 'src/user/dto/entities';
import { TutorProfileSubject } from './tutor-profile-subject.entity';

@ObjectType()
export class TutorProfile {
  @Field()
  id: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @HideField()
  userId: string;

  @Field(() => [JobConnection], { nullable: 'itemsAndList' })
  jobConnections?: JobConnection[];

  @Field(() => [TutorProfileSubject], { nullable: 'itemsAndList' })
  tutorProfileSubjects?: TutorProfileSubject[];
}
