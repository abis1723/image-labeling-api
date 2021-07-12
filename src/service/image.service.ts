import multer from 'multer';
const { imageFilter } = require('@src/middleware/validateImageFile')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

export const uploadImage = multer({
  fileFilter: imageFilter, 
  storage,
}).single('file');

