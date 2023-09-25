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
      minlength: 6,
    },
    category: {
      type: String,
      enum: ["link", "second hand", "special"],
      required: [true, "Please provide category"],
    },
    tag: {
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
