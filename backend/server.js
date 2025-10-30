const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");

app.use("/auth", authRoutes);
app.use("/destination-guides", destinationRoutes);
app.use("/trip-itineraries", itineraryRoutes);
app.use("/favourites", favouriteRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error("Mongo Error:", err));
