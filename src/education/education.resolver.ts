import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ITokenPayload } from 'src/auth/types';
import { TokenPayload } from 'src/shared/decorators/current-user.decorator';
import { Education } from './dto/entities';
import { CreateEducationInput, UpdateEducationInput } from './dto/inputs';
import { EducationService } from './education.service';

@Resolver()
export class EducationResolver {
  constructor(private readonly educationService: EducationService) {}

  @Mutation(() => Education)
  async createEducation(
    @Args('createEducationInput')
    input: CreateEducationInput,
    @TokenPayload() { userId }: ITokenPayload,
  ) {
    return await this.educationService.createEducation(userId, input);
  }

  @Mutation(() => Education)
  async updateEducation(
    @Args('updateEducationInput') input: UpdateEducationInput,
  ) {
    return await this.educationService.updateEducation(input);
  }

  @Mutation(() => Education)
  async deleteEducation(@Args('educationId') id: string) {
    return await this.educationService.deleteEducation(id);
  }
}
