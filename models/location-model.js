const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide location name"],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  province: {
    type: String,
  },
  city: {
    type: String,
  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  url: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model("Location", LocationSchema);
