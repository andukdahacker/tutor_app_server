import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly fileService: FileUploadService,
    private readonly userService: UserService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.upload(file);
  }
}
