const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title for this report"]
    },
    content: {
      type: String,
      required: [true, "Please provide content"]
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      default: "pending"
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Report", ReportSchema);