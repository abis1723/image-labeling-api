import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "@src/utils/httpErrors";

export const checkGetParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.diseaseType) {
    throw new HTTP400Error("Missing diseaseType parameter");
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

