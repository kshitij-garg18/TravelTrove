const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { createItinerary, getItineraryById } = require("../controllers/itineraryController");

const router = express.Router();

router.post("/", verifyToken, createItinerary);
router.get("/:id", verifyToken, getItineraryById);

module.exports = router;
