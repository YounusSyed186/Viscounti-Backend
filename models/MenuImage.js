const mongoose = require('mongoose');

const menuImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true // adds createdAt & updatedAt automatically
});

module.exports = mongoose.model('MenuImage', menuImageSchema);
