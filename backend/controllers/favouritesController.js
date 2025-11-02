const Favourite = require("../models/Favourite");
const DestinationGuide = require("../models/DestinationGuide");
const TripItinerary = require("../models/TripItinerary");

exports.addFavourite = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const { destinationGuideId, tripItineraryId } = req.body;

    // Validate that at least one ID is provided
    if (!destinationGuideId && !tripItineraryId) {
      return res.status(400).json({
        message: "Either destinationGuideId or tripItineraryId is required",
      });
    }

    // Validate that only one is provided
    if (destinationGuideId && tripItineraryId) {
      return res.status(400).json({
        message: "Cannot save both destinationGuideId and tripItineraryId in one favourite",
      });
    }

    // Check if item exists
    if (destinationGuideId) {
      const destination = await DestinationGuide.findById(destinationGuideId);
      if (!destination) {
        return res.status(404).json({ message: "Destination guide not found" });
      }
    }

    if (tripItineraryId) {
      const itinerary = await TripItinerary.findById(tripItineraryId);
      if (!itinerary) {
        return res.status(404).json({ message: "Trip itinerary not found" });
      }
    }

    // Check if already in favourites
    const existing = await Favourite.findOne({
      userId,
      $or: [
        { destinationGuideId },
        { tripItineraryId },
      ],
    });

    if (existing) {
      return res.status(400).json({ message: "Already in favourites" });
    }

    // Create favourite
    const fav = new Favourite({
      userId,
      destinationGuideId: destinationGuideId || null,
      tripItineraryId: tripItineraryId || null,
    });

    await fav.save();

    // Populate and return
    const populatedFav = await Favourite.findById(fav._id)
      .populate("destinationGuideId")
      .populate("tripItineraryId")
      .lean();

    res.status(201).json(populatedFav);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;

    const favourites = await Favourite.find({ userId })
      .populate("destinationGuideId")
      .populate("tripItineraryId")
      .lean();

    // Transform the data to match frontend expectations
    // Mongoose populates destinationGuideId and tripItineraryId, but frontend expects destinationGuide and tripItinerary
    const transformedFavourites = favourites.map((fav) => {
      const transformed = {
        _id: fav._id,
        userId: fav.userId,
        createdAt: fav.createdAt,
        destinationGuide: fav.destinationGuideId && typeof fav.destinationGuideId === 'object' ? fav.destinationGuideId : null,
        tripItinerary: fav.tripItineraryId && typeof fav.tripItineraryId === 'object' ? fav.tripItineraryId : null,
      };
      
      return transformed;
    }).filter(fav => fav.destinationGuide || fav.tripItinerary); // Filter out favourites with no valid data

    res.json(transformedFavourites);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.removeFavourite = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const { id } = req.params;

    // Find and delete favourite
    const favourite = await Favourite.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }

    res.json({ message: "Removed from favourites" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
