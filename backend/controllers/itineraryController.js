const TripItinerary = require("../models/TripItinerary");

// Get all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await TripItinerary.find()
      .populate("userId", "email")
      .populate("reviews.userId", "email")
      .sort({ createdAt: -1 }) // Most recent first
      .lean();

    // Calculate ratings for each itinerary
    const itinerariesWithRatings = itineraries.map((itinerary) => {
      const reviews = itinerary.reviews || [];
      itinerary.ratings = {
        average: reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0,
        count: reviews.length,
      };
      return itinerary;
    });

    res.json(itinerariesWithRatings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new trip itinerary
exports.createItinerary = async (req, res) => {
  try {
    const { destination, duration, activities, lodging, dining } = req.body;
    const userId = req.user.userId;

    // Basic validation
    if (!destination || !duration) {
      return res.status(400).json({ message: "Destination and duration are required" });
    }

    if (!activities || !Array.isArray(activities) || activities.length === 0) {
      return res.status(400).json({ message: "At least one activity is required" });
    }

    // Validate activities structure
    for (const activity of activities) {
      if (!activity.name || !activity.description) {
        return res.status(400).json({ message: "Each activity must have name and description" });
      }
    }

    const newItinerary = new TripItinerary({
      userId,
      destination,
      duration: parseInt(duration),
      activities: activities || [],
      lodging: lodging || [],
      dining: dining || [],
    });

    await newItinerary.save();

    // Populate user info and calculate ratings
    const populatedItinerary = await TripItinerary.findById(newItinerary._id)
      .populate("userId", "email")
      .populate("reviews.userId", "email")
      .lean();

    // Calculate ratings
    const reviews = populatedItinerary.reviews || [];
    populatedItinerary.ratings = {
      average: reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0,
      count: reviews.length,
    };

    res.status(201).json(populatedItinerary);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get itinerary details by ID (public route)
exports.getItineraryById = async (req, res) => {
  try {
    const itinerary = await TripItinerary.findById(req.params.id)
      .populate("userId", "email")
      .populate("reviews.userId", "email")
      .lean();

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Calculate ratings
    const reviews = itinerary.reviews || [];
    itinerary.ratings = {
      average: reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0,
      count: reviews.length,
    };

    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete itinerary (admin only)
exports.deleteItinerary = async (req, res) => {
  try {
    // Check if user is admin (you may need to add this check based on your user model)
    // For now, we'll allow authenticated users to delete - you can add admin check if needed
    const itinerary = await TripItinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    await TripItinerary.findByIdAndDelete(req.params.id);

    res.json({ message: "Itinerary deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
