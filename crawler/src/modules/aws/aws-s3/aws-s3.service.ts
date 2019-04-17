import { Injectable } from '@nestjs/common';
import { Logger } from 'src/modules/util/logger';
import * as AWS from 'aws-sdk';
import { Env } from '../../util/env';

const logger = new Logger('AwsS3Service');

export interface IAwsUploadOptions {
  public?: boolean;
}

@Injectable()
export class AwsS3Service {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: Env.AWS_ACCES_KEY_ID,
      secretAccessKey: Env.AWS_SECRET_KEY,
    });
  }

  public async uploadFile(
    bucket: string,
    path: string,
    file: Buffer,
    options: IAwsUploadOptions = {},
  ) {
    await this.s3
      .upload({
        Bucket: bucket,
        Key: path,
        Body: file,
        ACL: options.public ? 'public-read' : undefined,
      })
      .promise();
    logger.log(`File '${path}' uploaded to AWS S3 bucket '${bucket}'`);
  }

  public async listFiles(bucket: string): Promise<AWS.S3.Object[]> {
    const data = await this.s3.listObjectsV2({ Bucket: bucket }).promise();
    return data.Contents;
  }

  public async removeFile(bucket: string, fileName: string) {
    await this.s3.deleteObject({ Bucket: bucket, Key: fileName }).promise();
    logger.log(`Object name '${fileName}' of bucket '${bucket}' is removed.`);
  }

  // JSON
  public async uploadJSON(
    bucket: string,
    fileName: string,
    obj: object,
    options: IAwsUploadOptions = {},
  ) {
    await this.s3
      .upload({
        Bucket: bucket,
        Key: fileName,
        Body: JSON.stringify(obj),
        ACL: options.public ? 'public-read' : undefined,
      })
      .promise();
    logger.log(`JSON file '${fileName}' uploaded to AWS S3 bucket '${bucket}'`);
  }

  public async getJSON(bucket: string, fileName: string): Promise<object> {
    const file = await this.s3
      .getObject({
        Bucket: bucket,
        Key: fileName,
        ResponseContentType: 'application/json',
      })
      .promise();

    return JSON.parse(file.Body.toString());
  }
}
