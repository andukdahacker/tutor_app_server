import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { TutorRequestConnection } from 'src/connection/dto/entities';
import { User } from 'src/user/dto/entities';
import { TutorProfileSubject } from './tutor-profile-subject.entity';

@ObjectType()
export class TutorProfile {
  @Field()
  id: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => User)
  user: User;

  @HideField()
  userId: string;

  @Field(() => [TutorRequestConnection], { nullable: 'itemsAndList' })
  tutorRequestConnections?: TutorRequestConnection[];

  @Field(() => [TutorProfileSubject], { nullable: 'itemsAndList' })
  tutorProfileSubject?: TutorProfileSubject[];
}
