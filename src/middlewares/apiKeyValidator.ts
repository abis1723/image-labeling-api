import express from 'express';
import log from '../logger';

export async function apiKeyValidate(req: express.Request | any, res: express.Response | any, next: () => void) {
   log.info(`authorize req with api key, ${req.originalUrl}`);
  try {
    if (!req.headers['x-api-key']) {
      res.status(401).send('headers x-api-key is missing');
    } else {
      return await apiAuthorized(req);
    }
    //next();
  } catch (error) {
    log.error('authorize error', JSON.stringify(error));
    res.status(401).send(`authorize error: ${JSON.stringify(error)}`);
  }

  async function apiAuthorized(req: any) {
    const apiKey = req.headers['x-api-key'];
    const apiSecret = await getApiSecret();
    if (!apiSecret) {
      throw new Error('api key not set');
    } else if (apiKey != apiSecret) {
      throw new Error('invalid api key');
    }
    return Promise.resolve(true);
  }
}
//future implementation with AWS Secret manager
async function getApiSecret() {
  return '3c98a900-c0d9-4fbe-b3fb-2eb52d545340';
}
