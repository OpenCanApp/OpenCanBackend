const { Vote, District } = require("../models");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createVote = async (req, res) => {
  const { district: districtId } = req.body;
  const userId = req.user.userId;
  req.body.user = userId;

  const foundDistrict = await District.findOne({ _id: districtId });

  if (!foundDistrict) {
    throw new CustomError.NotFoundError(
      `There is no district with id (${districtId})`
    );
  }

  const foundVote = await Vote.findOne({ district: districtId, user: userId });

  // Update Vote
  if (foundVote) {
    const newVote = await foundVote.updateOne(req.body, {
      runValidators: true,
    });
    return res.status(StatusCodes.OK).json({ vote: newVote });
  }

  const newVote = await Vote.create(req.body);

  return res.status(StatusCodes.CREATED).json({ vote: newVote });
};

const getAllVotes = async (req, res) => {
  const { district } = req.query;
  let queryObject = {};
  if (district) queryObject.district = district;

  const votes = await Vote.find(queryObject)
    .populate("user", ["name"])
    .populate("district", ["district"]);

  return res.status(StatusCodes.OK).json({ votes, count: votes.length });
};

const getSingleVote = async (req, res) => {
  const { id: voteId } = req.params;

  const vote = await Vote.findOne({ _id: voteId })
    .populate("user", ["name"])
    .populate("district", ["district"]);

  if (!vote) {
    throw new CustomError.NotFoundError(`There is no vote with id (${postId})`);
  }

  return res.status(StatusCodes.OK).json({ vote });
};

const updateVote = async (req, res) => {
  const { id: voteId } = req.params;
  const userId = req.user.userId;

  const foundVote = await Vote.findOne({ _id: voteId });

  if (!foundVote) {
    throw new CustomError.NotFoundError(`There is no vote with id (${voteId})`);
  }

  if (foundVote.user.toString() !== userId) {
    throw new CustomError.UnauthenticatedError(
      "Unauthenticated to edit the vote"
    );
  }

  const updatedVote = await foundVote.updateOne(req.body, {
    runValidators: true,
  });

  return res.status(StatusCodes.OK).json({ vote: updatedVote });
};

const deleteVote = async (req, res) => {
  const { id: voteId } = req.params;

  const deletedVote = await Vote.findOne({ _id: voteId });
  await deletedVote.deleteOne();

  return res.status(StatusCodes.OK).json({
    message: `Vote is removed`,
  });
};

module.exports = {
  createVote,
  getAllVotes,
  getSingleVote,
  updateVote,
  deleteVote,
};
