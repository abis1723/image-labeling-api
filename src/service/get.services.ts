import aws = require('aws-sdk');
import log from '@src/logger';
import { defaultRegion, awsDynamoUrl, dynamodbTableName, awsAccessKeyId, awsSecretAccessKey } from '@src/config';

aws.config.update({
  region: defaultRegion,
  dynamodb: {
    endpoint: awsDynamoUrl,
  },
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
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
        ':v_diseasetype': diseaseType,
      },
    };
    const result = await docClient.scan(params).promise();
    return result;
  } catch (error) {
    log.info(error);
  }
}

