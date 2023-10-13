const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      default: 1
    },
    topic: {
      type: String,
    },
    content: {
      type: String
    },
    order: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Document", DocumentSchema);