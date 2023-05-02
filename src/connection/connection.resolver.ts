import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ITokenPayload } from 'src/auth/types';
import { NotificationService } from 'src/notification/notification.service';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
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
  constructor(
    private readonly connectionService: ConnectionService,
    private readonly notificationService: NotificationService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Mutation(() => CreateTutorRequestConnectResponse)
  async createTutorRequestConnection(
    @Args('createTutorRequestConnectInput')
    input: CreateTutorRequestConnectInput,
    @TokenPayload() tokenPayload: ITokenPayload,
  ): Promise<CreateTutorRequestConnectResponse> {
    const connection =
      this.connectionService.createTutorRequestConnection(input);
    const notification = this.notificationService.createNotification({
      itemId: input.tutorRequestId,
      type: 'LEARNER_REQUEST',
      receiverId: input.tutorUserId,
      notifierId: tokenPayload.userId,
    });

    const result = await Promise.all([connection, notification]);
    this.pubSub.publish('LEARNER_REQUEST', result[1]);
    return {
      tutorRequestConnection: result[0],
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
