// import { AnySchema } from 'yup';
// import { Request, Response, NextFunction } from 'express';
// import logger from '@src/logger';

// const validate =
//   (schema: AnySchema) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.validate({
//         file: req.file,
//       });

//       return next();
//     } catch (error) {
//       logger.error(error);
//       return res.status(400).send(error.errors);
//     }
//   };

// export default validate;

import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "@src/utils/httpErrors";

export const checkProfileParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.id) {
    throw new HTTP400Error("Missing id parameter");
  } else {
    next();
  }
};

export const checkPostRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) {
    throw new HTTP400Error("Missing request body");
  } else {
    next();
  }
};

