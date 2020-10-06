import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: multer.StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(_, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const underscoredOriginalName = file.originalname.replace(/\s/g, '_');
        const fileName = `${fileHash}-${underscoredOriginalName}`;
        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: { bucket: process.env.STORAGE_S3_BUCKET },
  },
} as IUploadConfig;
