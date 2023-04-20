import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateTutorRequestInput } from './dto/inputs';
import { CreateTutorRequestResponse } from './dto/response';
import { TutorRequestService } from './tutor-request.service';

@Resolver()
export class TutorRequestResolver {
  constructor(private readonly tutorRequestService: TutorRequestService) {}

  @Mutation(() => CreateTutorRequestResponse)
  async createTutorRequest(
    @Args('createTutorRequestInput') input: CreateTutorRequestInput,
  ) {
    const tutorRequest = await this.tutorRequestService.createTutorRequest(
      input,
    );
    return {
      tutorRequest,
    };
  }
}
