const fs = require("fs");
const MenuImage = require("../models/MenuImage.js");
const cloudinary = require("../cloudinary.js");

// =======================
// 📌 Get all Menu Images
// =======================
exports.getMenuImages = async (req, res) => {
  try {
    const images = await MenuImage.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    console.error("Error fetching menu images:", err);
    res.status(500).json({ message: "Error fetching menu images", error: err.message });
  }
};

// =======================
// 📌 Upload Menu Image
// =======================
exports.uploadMenuImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "menu_images",
    });

    // Cleanup local temp file
    fs.unlinkSync(req.file.path);

    // Save in DB
    const newImage = new MenuImage({
      imageUrl: result.secure_url,
    });
    await newImage.save();

    res.status(201).json(newImage);
  } catch (err) {
    console.error("Error uploading menu image:", err);
    res.status(500).json({ message: "Error uploading menu image", error: err.message });
  }
};

// =======================
// 📌 Delete Menu Image
// =======================
exports.deleteMenuImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find in DB
    const image = await MenuImage.findById(id);
    if (!image) return res.status(404).json({ message: "Menu image not found" });

    // Extract public_id correctly (folder + filename)
    const publicId = image.imageUrl
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from DB
    await MenuImage.findByIdAndDelete(id);

    res.json({ message: "Menu image deleted successfully" });
  } catch (err) {
    console.error("Error deleting menu image:", err);
    res.status(500).json({ message: "Error deleting menu image", error: err.message });
  }
};
