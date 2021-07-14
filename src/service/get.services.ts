import { Request } from 'express';
import aws = require('aws-sdk');
import logger from '@src/logger';

const { defaultRegion, awsDynamoUrl, dynamodbTableName } = require('@src/config');
const username = require('os').userInfo().username;

aws.config.update({
  region: defaultRegion,
  dynamodb: {
    endpoint: awsDynamoUrl,
  },
  accessKeyId: 'fakeid',
  secretAccessKey: 'fakekey',
});

const docClient = new aws.DynamoDB.DocumentClient();

export async function getImageMetaData(id: String) {
  try {
    var params = {
      Key: {
        id: id
      },
      TableName: dynamodbTableName,
    };
    const result = await docClient.get(params).promise();
    logger.info(JSON.stringify(result));
    return result;
  } catch (error) {
    logger.info(error);
  }
}
