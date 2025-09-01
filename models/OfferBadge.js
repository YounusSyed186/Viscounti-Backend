const mongoose = require("mongoose");

const OfferBadgeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    discount: {
      type: Number, // e.g. 20 for 20%
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true, // make expiry mandatory so admin must set it
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OfferBadge", OfferBadgeSchema);
