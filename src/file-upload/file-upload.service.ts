import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CLOUDFRONT_DOMAIN_NAME } from 'src/shared/constants';

@Injectable()
export class FileUploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });
  constructor(private readonly configService: ConfigService) {}

  async upload(file: Express.Multer.File) {
    console.log(file);
    const ob = new PutObjectCommand({
      Bucket: 'tutorapps3',
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const result = await this.s3Client.send(ob);

    if (result) return `${CLOUDFRONT_DOMAIN_NAME}/${file.originalname}`;

    return false;
  }
}
