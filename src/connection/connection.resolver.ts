import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';
import {
  CreateTutorRequestConnectInput,
  TutorRequestConnectionWhereUniqueInput,
} from './dto/inputs';
import {
  AcceptTutorRequestConnectionResponse,
  CreateTutorRequestConnectResponse,
} from './dto/response';
import { DeclineTutorRequestConnectinoResponse } from './dto/response/decline-tutor-request-connection.response';

@Resolver()
export class ConnectionResolver {
  constructor(private readonly connectionService: ConnectionService) {}

  @Mutation(() => CreateTutorRequestConnectResponse)
  async createTutorRequestConnection(
    @Args('createTutorRequestConnectInput')
    input: CreateTutorRequestConnectInput,
  ): Promise<CreateTutorRequestConnectResponse> {
    const connection =
      await this.connectionService.createTutorRequestConnection(input);

    return {
      tutorRequestConnection: connection,
    };
  }

  @Mutation(() => AcceptTutorRequestConnectionResponse)
  async acceptTutorRequestConnection(
    @Args('tutorRequestConnectionWhereUniqueInput')
    input: TutorRequestConnectionWhereUniqueInput,
  ): Promise<AcceptTutorRequestConnectionResponse> {
    const connection =
      await this.connectionService.acceptTutorRequestConnection(input);

    return {
      tutorRequestConnection: connection,
    };
  }

  @Mutation(() => DeclineTutorRequestConnectinoResponse)
  async declineTutorRequestConnection(
    @Args('tutorRequestConnectionWhereUniqueInput')
    input: TutorRequestConnectionWhereUniqueInput,
  ): Promise<DeclineTutorRequestConnectinoResponse> {
    const connection =
      await this.connectionService.declineTutorRequestConnection(input);

    return {
      tutorRequestConnection: connection,
    };
  }
}
