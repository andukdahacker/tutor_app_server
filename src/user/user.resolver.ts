import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileUploadService,
  ) {}

  @Mutation(() => String)
  async uploadAvatar(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    const buffer = file.createReadStream();
    return await this.fileService.upload(file.filename, buffer);
  }
}
