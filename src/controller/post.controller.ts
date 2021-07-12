import { Request, Response } from 'express';
import { get } from 'lodash';
import logger from '@src/logger';

import { uploadImage } from '@src/service/image.service';
import { MetadataProvider } from '@src/service/metadata.service';

let message: String = '';
export async function createPostHandler(req: Request, res: Response) {
  const metadataProvider = new MetadataProvider(req);
  let message: String = '';

  uploadImage(req, res, async (err) => {
    try {
      if (err) {
        return res
          .status(422)
          .send({
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
      message = 'image and label uploaded successfully';
      logger.info(message);
      return res.status(200).send(message);
    } catch (err) {
      logger.error(err.message);
      return res.status(500).json({
        status: 'failed',
        code: '500',
        message: err.message,
      });
    }
  });
}
