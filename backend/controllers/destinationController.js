const DestinationGuide = require("../models/DestinationGuide");

// Search destinations with sorting
exports.searchDestinations = async (req, res) => {
  try {
    // Support both 'query' and 'q' for backward compatibility
    const queryText = req.query.query || req.query.q || "";
    const { location, sortBy } = req.query;

    // Build search query
    const searchQueryObj = {};
    if (queryText) {
      searchQueryObj.$or = [
        { title: { $regex: queryText, $options: "i" } },
        { summary: { $regex: queryText, $options: "i" } },
        { description: { $regex: queryText, $options: "i" } },
      ];
    }
    if (location) {
      searchQueryObj.location = { $regex: location, $options: "i" };
    }

    // Build sort query
    let sortQuery = {};
    switch (sortBy) {
      case "rating":
        sortQuery = { "reviews.rating": -1 };
        break;
      case "reviews":
        sortQuery = { "reviews": -1 };
        break;
      case "relevance":
      default:
        // Sort by relevance (text match score) or by average rating
        sortQuery = { "reviews": -1 };
        break;
    }

    // If no sortBy is specified, default to relevance (most reviews/rating)
    if (!sortBy || sortBy === "relevance") {
      sortQuery = {};
    }

    // Find destinations
    let destinations = await DestinationGuide.find(searchQueryObj)
      .populate("reviews.userId", "email")
      .lean();

    // Calculate ratings for sorting if needed
    if (sortBy === "rating" || sortBy === "relevance") {
      destinations = destinations.map((dest) => {
        const reviews = dest.reviews || [];
        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;
        dest.ratings = {
          average: avgRating,
          count: reviews.length,
        };
        return dest;
      });

      if (sortBy === "rating") {
        destinations.sort((a, b) => b.ratings.average - a.ratings.average);
      }
    } else {
      // Add ratings info to all results
      destinations = destinations.map((dest) => {
        const reviews = dest.reviews || [];
        dest.ratings = {
          average: reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0,
          count: reviews.length,
        };
        return dest;
      });
    }

    // Return in expected format
    res.json({ destinationGuides: destinations });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get destination details by ID
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await DestinationGuide.findById(req.params.id)
      .populate("reviews.userId", "email")
      .lean();

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Calculate ratings
    const reviews = destination.reviews || [];
    destination.ratings = {
      average: reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0,
      count: reviews.length,
    };

    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
