import { Express, Request, Response } from 'express';
import { createPostHandler, getMetadataHandler } from '@src/controller/image.controller';
import { checkPostRequestBody, checkGetParams  } from '@src/middlewares/validateRequest';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  app.post('/api/v1/imagelabels', checkPostRequestBody, createPostHandler);
  app.get('/api/v1/imagelabels', checkGetParams, getMetadataHandler);
}
