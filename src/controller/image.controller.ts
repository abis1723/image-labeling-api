import { Request, Response } from 'express';
import { get } from 'lodash';
import logger from '@src/logger';

import { uploadImage } from '@src/service/image.service';
import { MetadataProvider } from '@src/service/metadata.service';
import { getImageMetaData } from '@src/service/get.services';

export async function createPostHandler(req: Request, res: Response) {
  const metadataProvider = new MetadataProvider(req);
  let message: String = '';

  uploadImage(req, res, async err => {
    try {
      if (err) {
        return res.status(422).send({
          errors: [{ title: 'image upload error', message: err.message }],
        });
      }
      await metadataProvider.uploadtMetadata();
      const file = req.file;
      if (!file) {
        const message = 'Please upload file';
        logger.info(message);
        return res.status(400).json({
          status: 'failed',
          code: '400',
          message: message,
        });
      }
      message = 'image uploaded successfully';
      logger.info(message);
      return res.status(201).send(message);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({
        status: 'failed',
        code: '500',
        message: error.message,
      });
    }
  });
}

export async function getMetadataHandler(req: Request, res: Response) {
  const imageId = get(req, 'query.id');

  try {
    const result = await getImageMetaData(imageId);
    if (!result) {
      return res.status(404).json({
        status: 'failed',
        code: '404',
        message: 'error fetching data',
      });
    }
    return res.status(200).send(result);
  } catch (error) {
    logger.error(error.message);
      return res.status(500).json({
        status: 'failed',
        code: '500',
        message: error.message,
      });
  }
}
