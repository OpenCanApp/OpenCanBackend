const { District, Comment } = require("../models");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createComment = async (req, res) => {
  const { district: districtId } = req.body;
  const foundDistrict = await District.findOne({ _id: districtId });

  if (!foundDistrict) {
    throw new CustomError.NotFoundError(
      `There is no district with id (${districtId})`
    );
  }

  const userId = req.user.userId;
  req.body.user = userId;

  const foundComment = await Comment.findOne({
    district: districtId,
    user: userId,
  });

  // Overwrite Comment
  if (foundComment) {
    const updatedComment = await Comment.findOneAndUpdate(
      foundComment,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user", ["name"])
      .populate("district", ["district"]);
      
    return res.status(StatusCodes.OK).json({ comment: updatedComment });
  }

  const newComment = await Comment.create(req.body);

  return res.status(StatusCodes.CREATED).json({ comment: newComment });
};

const getAllComments = async (req, res) => {
  const { district } = req.query;
  let queryObject = {};
  if (district) queryObject.district = district;

  const comments = await Comment.find(queryObject)
    .populate("user", ["name"])
    .populate("district", ["district"]);

  res.status(StatusCodes.OK).json({ comments, count: comments.length });
};

const getSingleComment = async (req, res) => {
  const { id: commentId } = req.params;

  const foundComment = await Comment.findOne({ _id: commentId })
    .populate("user", ["name"])
    .populate("district", ["district"]);

  if (!foundComment) {
    throw new CustomError.NotFoundError(
      `There is no comment with id (${commentId})`
    );
  }

  return res.status(StatusCodes.OK).json({ comment: foundComment });
};

const updateComment = async (req, res) => {
  const { id: commentId } = req.params;
  const userId = req.user.userId;
  const { comment } = req.body;

  const foundComment = await Comment.findOne({ _id: commentId });

  if (!foundComment) {
    throw new CustomError.NotFoundError(
      `There is no comment with id (${commentId})`
    );
  }

  // if the user is not the owner of the comment
  if (foundComment.user.toString() !== userId) {
    throw new CustomError.UnauthenticatedError(
      "Unauthenticated to edit the comment"
    );
  }

  const updatedComment = await Comment.findOneAndUpdate(
    { _id: commentId, user: userId },
    { comment },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("user", ["name"])
    .populate("district", ["district"]);

  return res.status(StatusCodes.OK).json({ comment: updatedComment });
};

const deleteVote = async (req, res) => {
  const { id: commentId } = req.params;

  const deletedComment = await Comment.findOneAndDelete({ _id: commentId });

  return res.status(StatusCodes.OK).json({ message: `Comment is removed` });
};

module.exports = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteVote,
};
