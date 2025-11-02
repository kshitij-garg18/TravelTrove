const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, {
  timestamps: true,
});

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String },
  time: { type: String },
});

const lodgingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  priceRange: { type: String },
  address: { type: String },
});

const diningSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  description: { type: String, required: true },
  priceRange: { type: String },
  address: { type: String },
});

const tripItinerarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  destination: { type: String, required: true },
  duration: { type: Number, required: true },
  activities: [activitySchema],
  lodging: [lodgingSchema],
  dining: [diningSchema],
  reviews: [reviewSchema],
}, {
  timestamps: true,
});

// Virtual for average rating
tripItinerarySchema.virtual("ratings.average").get(function() {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / this.reviews.length;
});

// Virtual for rating count
tripItinerarySchema.virtual("ratings.count").get(function() {
  return this.reviews ? this.reviews.length : 0;
});

// Ensure virtuals are included in JSON
tripItinerarySchema.set("toJSON", { virtuals: true });
tripItinerarySchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("TripItinerary", tripItinerarySchema);
