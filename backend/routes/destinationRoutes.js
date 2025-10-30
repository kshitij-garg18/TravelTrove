const express = require("express");
const router = express.Router();
const {
  searchDestinations,
  getDestinationById,
} = require("../controllers/destinationController");

router.get("/search", searchDestinations);
router.get("/:id", getDestinationById);

module.exports = router;
