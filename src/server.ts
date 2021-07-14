import express from 'express';
const config = require('config');
import log from '@src/logger';
import routes from '@src/routes';
import * as apiKeyValidator from '@src/middlewares/apiKeyValidator';
import { CreateTableUtils } from '@src/utils/createtable.utils';
const createTableUtils = new CreateTableUtils();
const serverConfig = config.get('Server');
const PORT = serverConfig.port;

process.on('uncaughtException', error => {
  log.error(error.message);
  process.exit(1);
});

process.on('unhandledRejection', error => {
  log.error(error);
  process.exit(1);
});


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(apiKeyValidator.apiKeyValidate.bind(apiKeyValidator));
app.listen(PORT, () => {
  log.info(`Application started at port ${PORT} and NODE_ENV ${process.env.NODE_ENV}`);
  createTableUtils.createTable();
  routes(app);
});
