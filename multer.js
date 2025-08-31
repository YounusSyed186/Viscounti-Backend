const multer = require('multer');

// Configure Multer for storing file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Temporary folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);  // Create a unique filename
  },
});

const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;
