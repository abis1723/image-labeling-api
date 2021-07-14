import express from 'express';
const config = require('config');
import logger from '@src/logger';
import routes from './routes';
import * as apiKeyValidator from '@src/middlewares/apiKeyValidator';
import { CreateTableUtils } from '@src/utils/createtable.utils';
import {}
const createTableUtils = new CreateTableUtils();
const serverConfig = config.get('Server');
const PORT = serverConfig.port;

process.on('uncaughtException', error => {
  logger.error(error.message);
  process.exit(1);
});

process.on('unhandledRejection', error => {
  logger.error(error);
  process.exit(1);
});


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(apiKeyValidator.apiKeyValidate.bind(apiKeyValidator));
app.listen(PORT, () => {
  logger.info(`Application started at port ${PORT} and NODE_ENV ${process.env.NODE_ENV}`);
  createTableUtils.createTable();
  routes(app);
});
