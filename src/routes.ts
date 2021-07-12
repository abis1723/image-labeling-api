import { Express, Request, Response } from 'express';
import { createPostHandler } from '@src/controller/post.controller';
import { validateRequest } from '@src/middleware';
import { createPostSchema } from '@src/schema/post.schema';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  app.post('/api/v1/imagelabels', createPostHandler);
}
