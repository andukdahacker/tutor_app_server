import { ApiProperty } from '@nestjs/swagger';
import { Rating, User } from '@prisma/client';
import { Transform } from 'class-transformer';
import { JobEntity } from 'src/job/dto/entities';
import { ToTimestamp } from 'src/shared/utils/transform.utils';
import { UserEntity } from 'src/user/dto/entity/user.entity';
export class RatingEntity implements Rating {
  @ApiProperty()
  score: number;

  @ApiProperty()
  comment: string;

  @ApiProperty({ type: () => UserEntity })
  rater: UserEntity;

  @ApiProperty()
  raterId: string;

  @ApiProperty({ type: () => UserEntity })
  rated: User;

  @ApiProperty()
  ratedId: string;

  @ApiProperty({ type: () => JobEntity })
  job: JobEntity;

  @ApiProperty()
  jobId: string;

  @ApiProperty({ type: Number })
  @Transform(ToTimestamp)
  createdAt: Date;

  @ApiProperty({ type: Number })
  @Transform(ToTimestamp)
  updatedAt: Date;

  constructor({ rated, rater, ...data }: RatingEntity) {
    Object.assign(this, data);

    this.rater = rater ? new UserEntity(rater) : null;

    this.rated = rated ? new UserEntity(rated) : null;
  }
}
