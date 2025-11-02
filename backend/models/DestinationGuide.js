const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, {
  timestamps: true,
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

const destinationGuideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  photos: [{ type: String }],
  lodging: [lodgingSchema],
  dining: [diningSchema],
  reviews: [reviewSchema],
}, {
  timestamps: true,
});

// Virtual for average rating
destinationGuideSchema.virtual("ratings.average").get(function() {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / this.reviews.length;
});

// Virtual for rating count
destinationGuideSchema.virtual("ratings.count").get(function() {
  return this.reviews ? this.reviews.length : 0;
});

// Ensure virtuals are included in JSON
destinationGuideSchema.set("toJSON", { virtuals: true });
destinationGuideSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("DestinationGuide", destinationGuideSchema);
