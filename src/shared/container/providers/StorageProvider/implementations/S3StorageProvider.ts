import fs from 'fs';
import path from 'path';

import { S3 } from 'aws-sdk';

import uploadConfig from '@config/upload';
import { getType } from 'mime';
import IStorageProvider from '../models/IStorageProvider';

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  private bucket: string;

  constructor() {
    this.client = new S3();
    this.bucket = uploadConfig.config.aws.bucket;
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = getType(originalPath);
    if (!ContentType) throw new Error('File not found');

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: this.bucket,
        Key: file,
        ACL: 'public-read',
        ContentType,
        Body: fileContent,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({ Bucket: this.bucket, Key: file })
      .promise();
  }
}
