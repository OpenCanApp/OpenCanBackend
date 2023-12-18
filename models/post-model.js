const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      minlength: 6,
      maxlength: 50,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    category: {
      type: String,
      required: [true, "Please provide category"],
    },
    tags: {
      type: [String],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide User Id"],
    },
    image: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
