import { Resolver } from '@nestjs/graphql';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Resolver()
export class UserResolver {
  constructor(private readonly fileService: FileUploadService) {}

  // @Mutation(() => Boolean)
  // async uploadAvatar(
  //   @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  // ) {
  //   console.log('ran');
  //   const buffer = file.createReadStream();
  //   return await this.fileService.upload(file.filename, buffer);
  // }
}
