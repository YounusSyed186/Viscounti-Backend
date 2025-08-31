const express = require('express');
const router = express.Router();
const upload = require('../multer'); // Multer middleware
const menuController = require('../controllers/menuControllers');
// ---------------- MENU ROUTES ----------------
router.get('/', menuController.getAllMenuItems);
router.post('/', upload.single('image'), menuController.addMenuItem);
router.put('/:id', upload.single('image'), menuController.editMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;
