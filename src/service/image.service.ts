import multer from 'multer';
const { imageFilter } = require('@src/middlewares/validateImageFile')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now().toString()}-${file.originalname}`);
  },
});

export const uploadImage = multer({
  fileFilter: imageFilter, 
  storage,
}).single('file');

