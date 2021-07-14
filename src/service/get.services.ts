import { Request } from 'express';
import aws = require('aws-sdk');
import log from '@src/logger';

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

export async function getImageMetaData(diseaseType: String) {
  try {
    var params = {
      TableName: dynamodbTableName,
      IndexName: 'DiseaseTypeIndex',
      FilterExpression: '#diseasetype = :v_diseasetype',
      ExpressionAttributeNames: {
        '#diseasetype': 'diseasetype',
      },
      ExpressionAttributeValues: {
        ':v_diseasetype': diseaseType
      },
    };
    const result = await docClient.scan(params).promise();
    log.info(JSON.stringify(result));
    return result;
  } catch (error) {
    log.info(error);
  }
}
