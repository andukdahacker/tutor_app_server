import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { NotificationCreatedEvent } from 'src/notification/notification.constants';
import { NotificationService } from 'src/notification/notification.service';
import { PUB_SUB } from 'src/pub-sub/pub-sub.module';
import { paginate } from 'src/shared/utils/pagination.utils';
import { ConnectionService } from './connection.service';
import { JobConnectionType } from './dto/entities';
import { CreateJobConnectInput, JobConnectionWhereInput } from './dto/inputs';
import { AcceptJobConnectionInput } from './dto/inputs/accept-job-connection.input';
import { DeclineJobConnectionInput } from './dto/inputs/decline-job-connection.input';
import {
  AcceptJobConnectionResponse,
  CreateJobConnectResponse,
  GetRequestedJobsForTutorResponse,
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
  async createJobConnection(
    @Args('createJobConnectInput')
    input: CreateJobConnectInput,
  ): Promise<CreateJobConnectResponse> {
    const connection = this.connectionService.createJobConnection(input);

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
      jobConnection: result[0],
    };
  }

  @Mutation(() => AcceptJobConnectionResponse)
  async acceptJobConnection(
    @Args('acceptJobConnectionInput')
    input: AcceptJobConnectionInput,
    @Args('connectionType') type: JobConnectionType,
  ): Promise<AcceptJobConnectionResponse> {
    const connection = this.connectionService.acceptJobConnection(input);

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
      jobConnection: result[0],
    };
  }

  @Mutation(() => DeclineJobConnectinoResponse)
  async declineJobConnection(
    @Args('declineJobConnectionInput')
    input: DeclineJobConnectionInput,
  ): Promise<DeclineJobConnectinoResponse> {
    const connection = this.connectionService.declineJobConnection(input);

    const isJobToTutorType = input.type === 'JOB_TO_TUTOR';

    const notification = this.notificationService.createNotification({
      type: isJobToTutorType ? 'TUTOR_DECLINE' : 'LEARNER_DECLINE',
      notifierId: isJobToTutorType ? input.tutorUserId : input.learnerUserId,
      receiverId: isJobToTutorType ? input.learnerUserId : input.tutorUserId,
      itemId: input.jobId,
    });

    const result = await Promise.all([connection, notification]);
    this.pubSub.publish(NotificationCreatedEvent, result[1]);
    return {
      jobConnection: result[0],
    };
  }

  @Query(() => GetRequestedJobsForTutorResponse)
  async jobConnections(
    @Args('jobConnectionWhereInput') input: JobConnectionWhereInput,
  ): Promise<GetRequestedJobsForTutorResponse> {
    const jobConnections = await this.connectionService.getJobConnections(
      input,
    );

    return await paginate(jobConnections, 'jobId', async (cursor) => {
      return await this.connectionService.getJobConnections({
        stringCursor: cursor as string,
        ...input,
      });
    });
  }
}
