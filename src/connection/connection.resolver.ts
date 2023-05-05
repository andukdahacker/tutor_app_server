import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JobConnectionType } from '@prisma/client';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { NotificationCreatedEvent } from 'src/notification/notification.constants';
import { NotificationService } from 'src/notification/notification.service';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { ConnectionService } from './connection.service';
import {
  CreateJobConnectInput,
  JobConnectionWhereUniqueInput,
} from './dto/inputs';
import { AcceptJobConnectionInput } from './dto/inputs/accept-job-connection.input';
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
  ): Promise<CreateJobConnectResponse> {
    const connection =
      this.connectionService.createTutorRequestConnection(input);

    const isJobToTutorType = input.type === 'JOB_TO_TUTOR';

    const notifierId = isJobToTutorType
      ? input.learnerUserId
      : input.tutorUserId;

    const receiverId = isJobToTutorType
      ? input.tutorUserId
      : input.learnerUserId;

    const type = isJobToTutorType ? 'LEARNER_REQUEST' : 'TUTOR_REQUEST';

    const notification = this.notificationService.createNotification({
      itemId: input.jobId,
      type,
      receiverId,
      notifierId,
    });

    const result = await Promise.all([connection, notification]);

    this.pubSub.publish(NotificationCreatedEvent, result[1]);

    return {
      tutorRequestConnection: result[0],
    };
  }

  @Mutation(() => AcceptJobConnectionResponse)
  async acceptTutorRequestConnection(
    @Args('acceptJobConnectionInput')
    input: AcceptJobConnectionInput,
    @Args('connectionType') type: JobConnectionType,
  ): Promise<AcceptJobConnectionResponse> {
    const connection =
      this.connectionService.acceptTutorRequestConnection(input);

    const notification = this.notificationService.createNotification({
      type: type === 'JOB_TO_TUTOR' ? 'TUTOR_ACCEPT' : 'LEARNER_ACCEPT',
      itemId: input.jobId,
      notifierId:
        type === 'JOB_TO_TUTOR' ? input.learnerUserId : input.tutorUserId,
      receiverId:
        type === 'JOB_TO_TUTOR' ? input.tutorUserId : input.learnerUserId,
    });

    const result = await Promise.all([connection, notification]);
    this.pubSub.publish(NotificationCreatedEvent, result[1]);
    return {
      tutorRequestConnection: result[0],
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
