const DestinationGuide = require("../models/DestinationGuide");

// 1️⃣ Search destinations by keyword
exports.searchDestinations = async (req, res) => {
  try {
    const query = req.query.q || ""; // example: /destination-guides/search?q=beach

    // Find destinations where title or summary includes the query (case-insensitive)
    const destinations = await DestinationGuide.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { summary: { $regex: query, $options: "i" } },
      ],
    }).sort({ rating: -1 }); // sort by rating descending (most relevant first)

    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 2️⃣ Get destination details by ID
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await DestinationGuide.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
