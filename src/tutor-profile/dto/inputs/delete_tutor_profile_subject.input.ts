import { ApiProperty } from '@nestjs/swagger';

export class DeleteTutorProfileSubjectInput {
  @ApiProperty()
  subjectId: string;

  @ApiProperty()
  tutorProfileId: string;
}
