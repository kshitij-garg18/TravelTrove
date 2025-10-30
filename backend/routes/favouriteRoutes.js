const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  addFavourite,
  removeFavourite,
  getFavourites,
} = require("../controllers/favouritesController");

const router = express.Router();

router.post("/add", verifyToken, addFavourite);
router.delete("/remove/:destinationId", verifyToken, removeFavourite);
router.get("/", verifyToken, getFavourites);

module.exports = router;
