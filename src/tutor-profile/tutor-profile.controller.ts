import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ITokenPayload } from 'src/auth/types';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { paginate } from 'src/shared/utils/pagination.utils';
import {
  CreateTutorProfileInput,
  FindManyTutorProfilesInput,
  UpdateTutorProfileInput,
} from './dto/inputs';
import { FindManyTutorProfilesResponse } from './dto/response';
import { TutorProfileService } from './tutor-profile.service';

@Controller('tutor-profile')
export class TutorProfileController {
  constructor(private readonly tutorProfileService: TutorProfileService) {}

  @Post()
  async createTutorProfile(
    @Body() body: CreateTutorProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ) {
    const profile = await this.tutorProfileService.createTutorProfile(
      body,
      payload.userId,
    );

    return profile;
  }

  @Put()
  async updateTutorProfile(
    @Body() body: UpdateTutorProfileInput,
    @TokenPayload() payload: ITokenPayload,
  ) {
    const profile = await this.tutorProfileService.updateTutorProfile(
      body,
      payload.userId,
    );

    return profile;
  }

  @Get()
  async tutorProfiles(
    @Body() body: FindManyTutorProfilesInput,
  ): Promise<FindManyTutorProfilesResponse> {
    const profiles = await this.tutorProfileService.findManyTutorProfiles(body);

    return await paginate(
      profiles,
      'id',
      async (cursor: string) =>
        await this.tutorProfileService.findManyTutorProfiles({
          stringCursor: cursor,
          ...body,
        }),
    );
  }
}
