const OfferBadge = require("../models/OfferBadge");

// Fetch all badges
exports.getBadges = async (req, res) => {
  try {
    const badges = await OfferBadge.find().sort({ createdAt: -1 });
    res.status(200).json(badges);
  } catch (error) {
    res.status(500).json({ message: "Error fetching badges", error });
  }
};

// Add a new badge
exports.addBadge = async (req, res) => {
  try {
    const { title, description, discount, expiryDate } = req.body;

    const newBadge = new OfferBadge({
      title,
      description,
      discount,
      expiryDate,
    });

    const savedBadge = await newBadge.save();
    res.status(201).json(savedBadge);
  } catch (error) {
    res.status(500).json({ message: "Error adding badge", error });
  }
};

// Delete a badge
exports.deleteBadge = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBadge = await OfferBadge.findByIdAndDelete(id);

    if (!deletedBadge) {
      return res.status(404).json({ message: "Badge not found" });
    }

    res.status(200).json({ message: "Badge deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting badge", error });
  }
};
