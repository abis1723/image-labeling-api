import log from '@src/logger';

export const imageFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
      const errorMessage = 'Only image files are allowed!';
      log.error(errorMessage);
      return callback(new Error(errorMessage), false);
    }
    callback(null, true);
  };