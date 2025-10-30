const TripItinerary = require("../models/TripItinerary");

// 1️⃣ Create a new trip itinerary
exports.createItinerary = async (req, res) => {
  try {
    const { destination, duration, activities, lodging, dining } = req.body;

    // Basic validation
    if (!destination || !duration) {
      return res.status(400).json({ message: "Destination and duration are required" });
    }

    const newItinerary = new TripItinerary({
      destination,
      duration,
      activities,
      lodging,
      dining,
    });

    await newItinerary.save();
    res.status(201).json({ message: "Itinerary created successfully", itinerary: newItinerary });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 2️⃣ Get itinerary details by ID
exports.getItineraryById = async (req, res) => {
  try {
    const itinerary = await TripItinerary.findById(req.params.id);
    if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });

    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
