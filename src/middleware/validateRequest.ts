import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import log from '../logger';

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        file: req.file,
        query: req.query,
      });

      return next();
    } catch (error) {
      log.error(error);
      return res.status(400).send(error.errors);
    }
  };

export default validate;
