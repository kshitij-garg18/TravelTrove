const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  destinationGuideId: { type: mongoose.Schema.Types.ObjectId, ref: "DestinationGuide" },
  tripItineraryId: { type: mongoose.Schema.Types.ObjectId, ref: "TripItinerary" },
}, {
  timestamps: true,
});

// Ensure user can only have one favourite per item
favouriteSchema.index({ userId: 1, destinationGuideId: 1 }, { unique: true, sparse: true });
favouriteSchema.index({ userId: 1, tripItineraryId: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Favourite", favouriteSchema);
