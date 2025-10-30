const mongoose = require("mongoose");

const tripItinerarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional for later
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  activities: [String],
  lodging: String,
  dining: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TripItinerary", tripItinerarySchema);
