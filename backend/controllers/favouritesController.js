//import { Request, Response } from "express";

// Temporary in-memory data
//const favourites: { [userId: string]: string[] } = {};
const favourites = {}
// ⭐ Add to favourites
exports.addFavourite = (req, res) => {
  const userId = req.user.id;
  const { destinationId } = req.body;

  if (!destinationId)
    return res.status(400).json({ message: "destinationId is required" });

  if (!favourites[userId]) favourites[userId] = [];

  if (favourites[userId].includes(destinationId))
    return res.status(400).json({ message: "Already in favourites" });

  favourites[userId].push(destinationId);
  res.status(200).json({
    message: "Added to favourites",
    favourites: favourites[userId],
  });
};

// ❌ Remove from favourites
exports.removeFavourite = (req, res) => {
  const userId = req.user.id;
  const { destinationId } = req.params;

  if (!favourites[userId])
    return res.status(404).json({ message: "No favourites found for user" });

  favourites[userId] = favourites[userId].filter((id) => id !== destinationId);
  res.status(200).json({
    message: "Removed from favourites",
    favourites: favourites[userId],
  });
};

// 📋 Get all favourites
exports.getFavourites = (req, res) => {
  const userId = req.user.id;
  res.status(200).json({ favourites: favourites[userId] || [] });
};
