import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';
import { paginate } from 'src/shared/utils/pagination.utils';
import { ConnectionService } from './connection.service';
import { CreateJobConnectInput, JobConnectionWhereInput } from './dto/inputs';
import { AcceptJobConnectionInput } from './dto/inputs/accept-job-connection.input';
import { DeclineJobConnectionInput } from './dto/inputs/decline-job-connection.input';

@Controller('job-connection')
export class JobConnectionController {
  constructor(
    private readonly connectionService: ConnectionService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  async createJobConnection(
    @Body('createJobConnectInput')
    input: CreateJobConnectInput,
  ) {
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

    return result[0];
  }

  @Put('accept')
  async acceptJobConnection(
    @Body()
    input: AcceptJobConnectionInput,
  ) {
    const connection = this.connectionService.acceptJobConnection(input);
    const type = input.type;
    const notification = this.notificationService.createNotification({
      type: type === 'JOB_TO_TUTOR' ? 'TUTOR_ACCEPT' : 'LEARNER_ACCEPT',
      itemId: input.jobId,
      notifierId:
        type === 'JOB_TO_TUTOR' ? input.learnerUserId : input.tutorUserId,
      receiverId:
        type === 'JOB_TO_TUTOR' ? input.tutorUserId : input.learnerUserId,
    });

    const result = await Promise.all([connection, notification]);
    // this.pubSub.publish(NotificationCreatedEvent, result[1]);
    return {
      jobConnection: result[0],
    };
  }

  @Put('decline')
  async declineJobConnection(
    @Body()
    input: DeclineJobConnectionInput,
  ) {
    const connection = this.connectionService.declineJobConnection(input);

    const isJobToTutorType = input.type === 'JOB_TO_TUTOR';

    const notification = this.notificationService.createNotification({
      type: isJobToTutorType ? 'TUTOR_DECLINE' : 'LEARNER_DECLINE',
      notifierId: isJobToTutorType ? input.tutorUserId : input.learnerUserId,
      receiverId: isJobToTutorType ? input.learnerUserId : input.tutorUserId,
      itemId: input.jobId,
    });

    const result = await Promise.all([connection, notification]);
    // this.pubSub.publish(NotificationCreatedEvent, result[1]);
    return {
      jobConnection: result[0],
    };
  }

  @Get()
  async jobConnections(@Body() input: JobConnectionWhereInput) {
    const jobConnections =
      await this.connectionService.getJobConnections(input);

    return await paginate(jobConnections, 'jobId', async (cursor) => {
      return await this.connectionService.getJobConnections({
        stringCursor: cursor as string,
        ...input,
      });
    });
  }
}
