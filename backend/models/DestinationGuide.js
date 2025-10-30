const mongoose = require("mongoose");

const destinationGuideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  description: String,
  photos: [String],
  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: String }, // later we can link this to User
      comment: String,
      stars: Number,
    },
  ],
});

module.exports = mongoose.model("DestinationGuide", destinationGuideSchema);
