const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "pizze-tradizionali",
      "pizze-speciali",
      "calzoni",
      "kebab-panini",
      "burgers",
      "bibite"
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
