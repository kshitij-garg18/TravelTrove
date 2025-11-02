const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { createItinerary, getItineraryById, getAllItineraries, deleteItinerary } = require("../controllers/itineraryController");

const router = express.Router();

// Create itinerary requires authentication
router.post("/", verifyToken, createItinerary);

// Get all itineraries (public - no auth required)
router.get("/", getAllItineraries);

// Delete itinerary (admin only - requires authentication)
// IMPORTANT: This must come before the GET /:id route to avoid route conflicts
router.delete("/:id", verifyToken, deleteItinerary);

// Get itinerary details is public (no auth required)
router.get("/:id", getItineraryById);

module.exports = router;
