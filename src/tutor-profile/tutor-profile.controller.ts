import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/error_response';
import {
  ApiOkPaginatedResponse,
  Paginated,
} from 'src/shared/types/pagination.type';
import { paginate } from 'src/shared/utils/pagination.utils';
import { TutorProfileEntity } from './dto/entities/tutor-profile.entity';
import {
  CreateTutorProfileInput,
  FindManyTutorProfilesInput,
  UpdateTutorProfileInput,
} from './dto/inputs';
import { TutorProfileService } from './tutor-profile.service';

@ApiTags('Tutor Profile')
@Controller('tutor-profile')
export class TutorProfileController {
  constructor(private readonly tutorProfileService: TutorProfileService) {}

  @Post()
  @ApiOkResponse({ type: TutorProfileEntity })
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async createTutorProfile(@Body() body: CreateTutorProfileInput, @Req() req) {
    const profile = await this.tutorProfileService.createTutorProfile(
      body,
      req.user.userId,
    );

    return new TutorProfileEntity(profile);
  }

  @Put()
  @ApiOkResponse({ type: TutorProfileEntity })
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async updateTutorProfile(@Body() body: UpdateTutorProfileInput, @Req() req) {
    const profile = await this.tutorProfileService.updateTutorProfile(
      body,
      req.user.userId,
    );

    return new TutorProfileEntity(profile);
  }

  @Get()
  @ApiOkPaginatedResponse(TutorProfileEntity)
  @ApiUnauthorizedResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  async tutorProfiles(
    @Query() body: FindManyTutorProfilesInput,
  ): Promise<Paginated<TutorProfileEntity>> {
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

    return result;
  }
}
