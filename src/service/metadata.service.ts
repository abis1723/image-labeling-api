import { Request } from 'express';
import aws = require('aws-sdk');
import { v4 as uuidv4 } from 'uuid';
import logger from '@src/logger';
const {
  defaultRegion,
  awsDynamoUrl,
  dynamodbTableName,
} = require('@src/config');
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
const id = uuidv4();
export class MetadataProvider {
  private request;

  constructor(req: Request) {
    this.request = req;
  }
  
  async uploadtMetadata(): Promise<any> {
    if (this.request && this.request.query) {
      const imageMetadata = this.request.file;
      const label = this.request.query;
      const data = {
        id: id,
        ...imageMetadata,
        ...label,
        username: username,
      };
      var tableName = dynamodbTableName;
      var dbParam = {
        TableName: tableName,
        Item: data,
      };

      docClient.put(dbParam, (err, data) => {
        if (err) {
          logger.error(err);
        } else {
          logger.info(`successfully added the image metadata for id: ${id}`);
        }
      });
    }
   
  }
}
