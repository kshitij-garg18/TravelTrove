const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  addFavourite,
  removeFavourite,
  getFavourites,
} = require("../controllers/favouritesController");

const router = express.Router();

// All favourite routes require authentication
router.post("/", verifyToken, addFavourite);
router.delete("/:id", verifyToken, removeFavourite);
router.get("/", verifyToken, getFavourites);

module.exports = router;
