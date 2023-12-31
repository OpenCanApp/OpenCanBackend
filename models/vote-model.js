const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  district: {
    type: mongoose.Types.ObjectId,
    ref: "District",
    required: [true, "Please provide district id"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user id"],
  },
  safety: {
    type: Number,
    min: 0,
    max: 5,
  },
  transport: {
    type: Number,
    min: 0,
    max: 5,
  },
  shopping: {
    type: Number,
    min: 0,
    max: 5,
  },
  foods: {
    type: Number,
    min: 0,
    max: 5,
  },
  rent: {
    type: Number,
    min: 0,
    max: 5,
  },
});

// Only can vote one time
VoteSchema.index({ district: 1, user: 1 }, { unique: true });

VoteSchema.statics.calculateAverageRating = async function (districtId) {
  const result = await this.aggregate([
    { $match: { district: districtId } },
    {
      $group: {
        _id: null,
        safetyAverage: { $avg: "$safety" },
        transportAverage: { $avg: "$transport" },
        shoppingAverage: { $avg: "$shopping" },
        foodsAverage: { $avg: "$foods" },
        rentAverage: { $avg: "$rent" },
        numOfVote: { $sum: 1 },
      },
    },
  ]);
  try {
    await this.model("District").findOneAndUpdate(
      { _id: districtId },
      {
        safety: (result[0]?.safetyAverage || 0).toFixed(1),
        safety: (result[0]?.safetyAverage || 0).toFixed(1),
        transport: (result[0]?.transportAverage || 0).toFixed(1),
        shopping: (result[0]?.shoppingAverage || 0).toFixed(1),
        foods: (result[0]?.foodsAverage || 0).toFixed(1),
        rent: (result[0]?.rentAverage || 0).toFixed(1),
        numOfVote: result[0]?.numOfVote || 0,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

VoteSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.district);
});

VoteSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    console.log("deleteOne");
    await this.constructor.calculateAverageRating(this.district);
  }
);

VoteSchema.post(
  "findOneAndDelete",
  { document: true, query: false },
  async function () {
    console.log("findOneAndDelete");
    await this.constructor.calculateAverageRating(this.district);
  }
);

VoteSchema.post(
  "updateOne",
  { document: true, query: false },
  async function () {
    await this.constructor.calculateAverageRating(this.district);
  }
);

module.exports = mongoose.model("Vote", VoteSchema);
