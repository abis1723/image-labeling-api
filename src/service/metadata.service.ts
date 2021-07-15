import { Request } from 'express';
import aws = require('aws-sdk');
import { v4 as uuidv4 } from 'uuid';
import logger from '@src/logger';
import { defaultRegion, awsDynamoUrl, dynamodbTableName, awsAccessKeyId, awsSecretAccessKey } from '@src/config';

const username = require('os').userInfo().username;

aws.config.update({
  region: defaultRegion,
  dynamodb: {
    endpoint: awsDynamoUrl,
  },
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
});

const docClient = new aws.DynamoDB.DocumentClient();
export class MetadataProvider {
  private request;

  constructor(req: Request) {
    this.request = req;
  }

  async uploadtMetadata(): Promise<any> {
    if (this.request.file && this.request.query) {
      const imageMetadata = this.request.file;
      const query = this.request.query;

      const data = {
        id: uuidv4(),
        ...imageMetadata,
        ...query,
        username: username,
        datecreated: Date.now(),
      };
      var tableName = dynamodbTableName;
      var dbParam = {
        TableName: tableName,
        Item: data,
      };

      docClient.put(dbParam, (err, data) => {
        if (err) {
          logger.error(err);
          return;
        } else {
          logger.info('successfully added the image metadata');
        }
      });
    }
  }
}
