import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ITokenPayload } from 'src/auth/types';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { WorkExperience } from './dto/entities';
import {
  CreateWorkExperienceInput,
  UpdateWorkExperienceInput,
} from './dto/inputs';
import { WorkExperienceService } from './work-experience.service';

@Resolver()
export class WorkExperienceResolver {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Mutation(() => WorkExperience)
  async createWorkExperience(
    @Args('createWorkExperienceInput') input: CreateWorkExperienceInput,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    return await this.workExperienceService.createWorkExperience(userId, input);
  }

  @Mutation(() => WorkExperience)
  async updateWorkExperience(
    @Args('updateWorkExperienceInput') input: UpdateWorkExperienceInput,
  ) {
    return await this.workExperienceService.updateWorkExperience(input);
  }

  @Mutation(() => WorkExperience)
  async deleteWorkExperience(@Args('workExperienceId') id: string) {
    return await this.workExperienceService.deleteWorkExperience(id);
  }
}
