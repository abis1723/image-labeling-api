import aws = require('aws-sdk');
import multer = require('multer');
import multerS3 = require('multer-s3');
import log from '@src/logger';
import { defaultRegion, imageBucketName, minioUrl, minioAccessKeyId, minioSecretAccessKey } from '@src/config';

aws.config.update({
  region: defaultRegion,
});

const s3 = new aws.S3({
  accessKeyId: minioAccessKeyId,
  secretAccessKey: minioSecretAccessKey,
  endpoint: minioUrl,
  s3ForcePathStyle: true, 
  signatureVersion: 'v4',
  region: defaultRegion
});

const imageFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
    const errorMessage = 'Only image files are allowed!';
    log.error(errorMessage);
    return callback(new Error(errorMessage), false);
  }
  callback(null, true);
};

export const uploadtoS3 = multer({
  fileFilter: imageFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: imageBucketName,
    cacheControl: 'max-age=31536000',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}.jpg`);
    },
  }),
}).single('file');
