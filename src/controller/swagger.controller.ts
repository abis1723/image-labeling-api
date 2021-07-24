const YAML = require('yamljs');
const path = require('path')
const swagger_path = path.resolve(__dirname, './swagger.yaml');

export const swaggerUi = require('swagger-ui-express');
export const swaggerDocument = YAML.load(swagger_path);

