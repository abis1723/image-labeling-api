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
          },
          {
            AttributeName: 'diseasetype',
            AttributeType: 'S',
          }
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          }
        ],
        
      GlobalSecondaryIndexes: [
        {
          IndexName: 'DiseaseTypeIndex',
          KeySchema: [
            { AttributeName: 'diseasetype', KeyType: "HASH" },
          ],
          Projection: {
            ProjectionType: 'ALL'
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
        TableName: dynamodbTableName,
      };
      dynamodb.createTable(params, (err, data) => {
        if (err) log.error(err.stack);
        else log.info(data);
      });
    }
  }

  async tableExists(): Promise<any>{
    const tables = await dynamodb.listTables().promise();
    const table = tables.TableNames.find(val => val == dynamodbTableName);
    return table ? true : false; 
  }
}
