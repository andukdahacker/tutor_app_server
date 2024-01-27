import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JobService } from 'src/job/job.service';
import { NotificationService } from 'src/notification/notification.service';
import { ErrorResponse } from 'src/shared/types/error_response';
import { ApiOkPaginatedResponse } from 'src/shared/types/pagination.type';
import { paginate } from 'src/shared/utils/pagination.utils';
import { ConnectionService } from './connection.service';
import { JobConnectionEntity } from './dto/entities';
import { CreateJobConnectInput, JobConnectionWhereInput } from './dto/inputs';
import { AcceptJobConnectionInput } from './dto/inputs/accept-job-connection.input';
import { DeclineJobConnectionInput } from './dto/inputs/decline-job-connection.input';
import { DeleteJobConnectionInput } from './dto/inputs/delete_job_connection';
import AcceptJobConnectionResponse from './dto/response/accept_job_connection_response';
import DisconnectJobConnectionInput from './dto/inputs/disconnect-job-connection.input';

@ApiTags('Job Connections')
@Controller('job-connection')
export class JobConnectionController {
  constructor(
    private readonly connectionService: ConnectionService,
    private readonly notificationService: NotificationService,
    private readonly jobService: JobService,
  ) {}

  @Post()
  @ApiOkResponse({ type: JobConnectionEntity })
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async createJobConnection(
    @Body()
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
  @ApiOkResponse({ type: AcceptJobConnectionResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async acceptJobConnection(
    @Body()
    input: AcceptJobConnectionInput,
  ) {
    const connection = this.connectionService.acceptJobConnection(input);
    const updatedJob = this.jobService.updateJob({
      id: input.jobId,
      jobStatus: 'EMPLOYED',
    });
    const type = input.type;
    const notification = this.notificationService.createNotification({
      type: type === 'JOB_TO_TUTOR' ? 'TUTOR_ACCEPT' : 'LEARNER_ACCEPT',
      itemId: input.jobId,
      notifierId:
        type === 'JOB_TO_TUTOR' ? input.learnerUserId : input.tutorUserId,
      receiverId:
        type === 'JOB_TO_TUTOR' ? input.tutorUserId : input.learnerUserId,
    });

    const result = await Promise.all([connection, updatedJob, notification]);
    // this.pubSub.publish(NotificationCreatedEvent, result[1]);
    return new AcceptJobConnectionResponse(result[1], result[0]);
  }

  @Put('decline')
  @ApiOkResponse({ type: JobConnectionEntity })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
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
    return result[0];
  }

  @Put('disconnect')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async disconnectJobConnection(@Body() input: DisconnectJobConnectionInput) {
    await this.connectionService.disconnectJobConnection(input);

    return;
  }

  @Get()
  @ApiOkPaginatedResponse(JobConnectionEntity)
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async jobConnections(@Query() query: JobConnectionWhereInput, @Req() req) {
    const jobConnections =
      await this.connectionService.getJobConnections(query);

    return await paginate(jobConnections, 'jobId', async (cursor) => {
      return await this.connectionService.getJobConnections({
        ...query,
        stringCursor: cursor as string,
      });
    });
  }

  @Get('tutor')
  @ApiOkPaginatedResponse(JobConnectionEntity)
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async tutorJobConnections(@Query() query: JobConnectionWhereInput) {
    const jobConnections =
      await this.connectionService.getTutorJobConnections(query);

    return await paginate(jobConnections, 'jobId', async (cursor) => {
      return await this.connectionService.getTutorJobConnections({
        ...query,
        stringCursor: cursor as string,
      });
    });
  }

  @Get('job')
  @ApiOkPaginatedResponse(JobConnectionEntity)
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async jobJobConnections(@Query() query: JobConnectionWhereInput) {
    const jobConnections =
      await this.connectionService.getJobJobConnections(query);

    return await paginate(
      jobConnections,
      'tutorId',
      async (cursor: string) =>
        await this.connectionService.getJobJobConnections({
          ...query,
          stringCursor: cursor,
        }),
    );
  }

  @Post('delete')
  @ApiOkResponse({ type: () => JobConnectionEntity })
  @ApiUnauthorizedResponse({ type: () => ErrorResponse })
  @ApiInternalServerErrorResponse({ type: () => ErrorResponse })
  async deleteConnection(
    @Body() deleteConnectionInput: DeleteJobConnectionInput,
  ) {
    const connection = await this.connectionService.deleteJobConnection(
      deleteConnectionInput,
    );

    return new JobConnectionEntity(connection);
  }

  @Get('accepted/:jobId')
  @ApiOkResponse({ type: () => JobConnectionEntity })
  @ApiUnauthorizedResponse({ type: () => ErrorResponse })
  async getAcceptedConnection(@Param('jobId') jobId: string) {
    const connection = await this.connectionService.getAcceptedConnection({
      jobId,
    });

    return new JobConnectionEntity(connection);
  }
}
