const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    district: {
      type: mongoose.Types.ObjectId,
      ref: "District",
      required: [true, "Please provide district id"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"]
    },
    comment: {
      type: String
    }
  }
)

CommentSchema.index({district: 1, user: 1}, {unique: true});

module.exports = mongoose.model("Comment", CommentSchema);