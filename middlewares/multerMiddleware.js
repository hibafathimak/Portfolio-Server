const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio-projects', 
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => `image-${Date.now()}-${file.originalname}`,
  },
});

const multerMiddleware = multer({ storage });

module.exports = multerMiddleware;
