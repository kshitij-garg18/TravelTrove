const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  itemId: String, // could be destination or itinerary id
  itemType: String, // "destination" or "itinerary"
});

module.exports = mongoose.model("Favourite", favouriteSchema);
