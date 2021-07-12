const config = require('config');

export const defaultRegion = config.get('DefaultRegion');
export const awsDynamoUrl = config.get('AWSDynamoUrl');
export const dynamodbTableName = 'image_labeling_metadata';