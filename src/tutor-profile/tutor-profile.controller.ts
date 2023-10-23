import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ITokenPayload } from 'src/auth/types';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { BaseResponse } from 'src/shared/types/base_response';
import { Paginated } from 'src/shared/types/pagination.type';
import { paginate } from 'src/shared/utils/pagination.utils';
import { TutorProfileEntity } from './dto/entities/tutor-profile.entity';
import {
  CreateTutorProfileInput,
  FindManyTutorProfilesInput,
  UpdateTutorProfileInput,
} from './dto/inputs';
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
    @Query() body: FindManyTutorProfilesInput,
  ): Promise<BaseResponse<Paginated<TutorProfileEntity>>> {
    const profiles = await this.tutorProfileService.findManyTutorProfiles(body);

    const result = await paginate(
      profiles,
      'id',
      async (cursor: string) =>
        await this.tutorProfileService.findManyTutorProfiles({
          stringCursor: cursor,
          ...body,
        }),
    );

    return {
      statusCode: 200,
      data: result,
    };
  }
}
