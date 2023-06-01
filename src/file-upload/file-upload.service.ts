import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CLOUDFRONT_DOMAIN_NAME, S3_BUCKET_NAME } from 'src/shared/constants';
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
    const key = `${Date.now()}${file.originalname}`;
    const cmd = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const result = await this.s3Client.send(cmd);

    if (result) return `${CLOUDFRONT_DOMAIN_NAME}/${key}`;

    return false;
  }

  async retryUpload(file: Express.Multer.File, maxRetries: number) {
    for (let i = 0; i >= maxRetries; i++) {
      const retryResult = await this.upload(file);
      if (retryResult) {
        return retryResult;
      } else {
        continue;
      }
    }

    return file;
  }

  async delete(key: string) {
    const cmd = new DeleteObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
    });

    const result = await this.s3Client.send(cmd);

    if (result) return true;

    return false;
  }
}
