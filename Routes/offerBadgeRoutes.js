const express = require("express");
const router = express.Router();
const {
  getBadges,
  addBadge,
  deleteBadge,
} = require("../controllers/offerBadgeController");

// GET all badges
router.get("/", getBadges);

// POST new badge
router.post("/", addBadge);

// DELETE badge
router.delete("/:id", deleteBadge);

module.exports = router;
