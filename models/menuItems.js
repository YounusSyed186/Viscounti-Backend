const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "menu fisso",
      "pizze-tradizionali",
      "pizze-speciali",
      "calzoni",
      "kebab-panini",
      "burgers",
      "bibite",
      "fritte",
      "Indian cuisine",
      "dolco"
    ],
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  Available: {
    type: Boolean,
    default: true,
  },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
