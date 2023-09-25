const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title of the news"],
    },
    description: {
      type: String,
    },
    url: {
      type: String,
      required: [true, "Please provide the url of the news"],
    },
    image: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

NewsSchema.statics.removeAllNews = async function () {
  await this.deleteMany({});
};

module.exports = mongoose.model("News", NewsSchema);
