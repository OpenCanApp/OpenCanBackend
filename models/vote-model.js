const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema(
  {
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
    },
    transport: {
      type: Number,
    },
    shopping: {
      type: Number,
    },
    foods: {
      type: Number,
    },
    rent: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

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
        safety: Math.ceil(result[0]?.safetyAverage || 0),
        transport: Math.ceil(result[0]?.transportAverage || 0),
        shopping: Math.ceil(result[0]?.shoppingAverage || 0),
        foods: Math.ceil(result[0]?.foodsAverage || 0),
        rent: Math.ceil(result[0]?.rentAverage || 0),
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
