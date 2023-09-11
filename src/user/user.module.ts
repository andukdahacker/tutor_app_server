import { Module } from '@nestjs/common';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { LearnerProfileModule } from 'src/learner-profile/learner-profile.module';
import { LearnerProfileService } from 'src/learner-profile/learner-profile.service';
import { TutorProfileModule } from 'src/tutor-profile/tutor-profile.module';
import { TutorProfileService } from 'src/tutor-profile/tutor-profile.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [
    UserService,
    FileUploadService,
    TutorProfileService,
    LearnerProfileService,
  ],
  exports: [UserService],
  imports: [FileUploadModule, TutorProfileModule, LearnerProfileModule],
  controllers: [UserController],
})
export class UserModule {}
