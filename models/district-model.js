const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema(
  {
    district: {
      type: String,
    },
    city : {
      type: String,
    },
    province: {
      type: String,
    },
    safety: {
      type: Number,
      default: 0,
    },
    transport: {
      type: Number,
      default: 0,
    },
    shopping: {
      type: Number,
      default: 0,
    },
    foods: {
      type: Number,
      default: 0,
    },
    rent: {
      type: Number,
      default: 0,
    },
    numOfVote: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("District", DistrictSchema);
