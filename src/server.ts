import express from 'express';
const config = require('config');
//import log from "./logger";
import routes from './routes';
//import { deserializeUser } from "./middleware";
const serverConfig = config.get('Server');
const PORT = serverConfig.port;

const app = express();
//app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Application started at port ${PORT} and NODE_ENV ${process.env.NODE_ENV}`
  );

  routes(app);
});
