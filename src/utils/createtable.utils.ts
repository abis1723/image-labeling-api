import aws = require('aws-sdk');
import logger from '@src/logger';
const { defaultRegion, awsDynamoUrl, dynamodbTableName } = require('@src/config');

aws.config.update({
  region: defaultRegion,
  dynamodb: {
    endpoint: awsDynamoUrl,
  },
  accessKeyId: 'fakeid',
  secretAccessKey: 'fakekey',
});

const dynamodb = new aws.DynamoDB();

export class CreateTableUtils {
  async createTable(): Promise<any> {
    const isTableExists = await this.tableExists();
    if (!isTableExists) {
      const params = {
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          }
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
        TableName: dynamodbTableName,
      };
      dynamodb.createTable(params, (err, data) => {
        if (err) logger.error(err.stack);
        else logger.info(data);
      });
    }
  }

  async tableExists(): Promise<any>{
    const tables = await dynamodb.listTables().promise();
    const table = tables.TableNames.find(val => val == dynamodbTableName);
    return table ? true : false; 
  }
}
