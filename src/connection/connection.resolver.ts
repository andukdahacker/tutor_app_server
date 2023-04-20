import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';
import { CreateTutorRequestConnectInput } from './dto/inputs';
import { CreateTutorRequestConnectResponse } from './dto/response';

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
}
