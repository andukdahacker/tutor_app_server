import { Resolver } from '@nestjs/graphql';
import { TutorRequestService } from './tutor-request.service';

@Resolver()
export class TutorRequestResolver {
  constructor(private readonly tutorRequestService: TutorRequestService) {}
}
