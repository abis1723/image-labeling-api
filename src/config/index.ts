const config = require('config');

export const defaultRegion = config.get('DefaultRegion');
export const awsDynamoUrl = config.get('AWSDynamoUrl');
export const imageBucketName = config.get('ImageBucketName');
export const minioUrl = config.get('MinioUrl');
export const dynamodbTableName = 'image_labeling_metadata';
export const awsAccessKeyId = 'fakeid';
export const awsSecretAccessKey = 'fakekey';
export const minioAccessKeyId = 'minio';
export const minioSecretAccessKey = 'minio123';
