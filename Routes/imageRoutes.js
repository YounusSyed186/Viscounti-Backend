const express = require('express');
const router = express.Router();
const upload = require('../multer'); // Multer middleware
const imageController = require('../controllers/menuuploadControllers');

// ---------------- IMAGE ROUTES ----------------
router.get('/images', imageController.getMenuImages); // ✅ FIXED
router.post('/images', upload.single('image'), imageController.uploadMenuImage);
router.delete('/images/:id', imageController.deleteMenuImage);

module.exports = router;
