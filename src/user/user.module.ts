import { Module } from '@nestjs/common';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserResolver, UserService, FileUploadService],
  exports: [UserService],
  imports: [FileUploadModule],
  controllers: [UserController],
})
export class UserModule {}
