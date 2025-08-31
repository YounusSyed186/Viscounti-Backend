const MenuItem = require('../models/menuItems.js');
const cloudinary = require('../cloudinary');
const fs = require('fs');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    const groupedItems = menuItems.reduce((acc, item) => {
      const category = item.category || 'uncategorized';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
    res.status(200).json({ groupedItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching menu items' });
  }
};

// Add menu item
exports.addMenuItem = async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }
    const newMenuItem = new MenuItem({
      category: req.body.category,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: imageUrl,
    });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding menu item', error: err.message });
  }
};

// Edit menu item
exports.editMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating menu item', error: err.message });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted', deletedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting menu item', error: err.message });
  }
};

// Toggle availabi