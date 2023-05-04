import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ITokenPayload } from 'src/auth/types';
import { NotificationCreatedEvent } from 'src/notification/notification.constants';
import { NotificationService } from 'src/notification/notification.service';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { ConnectionService } from './connection.service';
import {
  CreateJobConnectInput,
  JobConnectionWhereUniqueInput,
} from './dto/inputs';
import {
  AcceptJobConnectionResponse,
  CreateJobConnectResponse,
} from './dto/response';
import { DeclineJobConnectinoResponse } from './dto/response/decline-job-connection.response';

@Resolver()
export class ConnectionResolver {
  constructor(
    private readonly connectionService: ConnectionService,
    private readonly notificationService: NotificationService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Mutation(() => CreateJobConnectResponse)
  async createTutorRequestConnection(
    @Args('createTutorRequestConnectInput')
    input: CreateJobConnectInput,
    @TokenPayload() tokenPayload: ITokenPayload,
  ): Promise<CreateJobConnectResponse> {
    const connection =
      this.connectionService.createTutorRequestConnection(input);
    const notification = this.notificationService.createNotification({
      itemId: input.jobId,
      type: input.type === 'JOB_TO_TUTOR' ? 'LEARNER_REQUEST' : 'TUTOR_REQUEST',
      receiverId: input.tutorUserId,
      notifierId: tokenPayload.userId,
    });

    const result = await Promise.all([connection, notification]);
    this.pubSub.publish(NotificationCreatedEvent, result[1]);
    return {
      tutorRequestConnection: result[0],
    };
  }

  @Mutation(() => AcceptJobConnectionResponse)
  async acceptTutorRequestConnection(
    @Args('tutorRequestConnectionWhereUniqueInput')
    input: JobConnectionWhereUniqueInput,
  ): Promise<AcceptJobConnectionResponse> {
    const connection =
      await this.connectionService.acceptTutorRequestConnection(input);
    return {
      tutorRequestConnection: connection,
    };
  }

  @Mutation(() => DeclineJobConnectinoResponse)
  async declineTutorRequestConnection(
    @Args('tutorRequestConnectionWhereUniqueInput')
    input: JobConnectionWhereUniqueInput,
  ): Promise<DeclineJobConnectinoResponse> {
    const connection =
      await this.connectionService.declineTutorRequestConnection(input);

    return {
      tutorRequestConnection: connection,
    };
  }
}
