const CustomError = require("../errors");
const { User, Post } = require("../models");
const { StatusCodes } = require("http-status-codes");

const createPost = async (req, res) => {
  const { userId } = req.user;
  req.body.user = userId;
  const { content } = req.body;

  // Check is it a link
  if (!content.includes("https://")) {
    throw new CustomError.BadRequestError(`Please provide valid  link`);
  }

  if (req.body.tags) {
    req.body.tags = req.body.tags.split(",").map((word) => word.trim());
  }

  const newPost = await Post.create(req.body);

  return res.status(StatusCodes.CREATED).json({ post: newPost });
};

const getSinglePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new CustomError.NotFoundError(`There is no post with id (${postId})`);
  }

  return res.status(StatusCodes.OK).json({ post });
};

const getAllPosts = async (req, res) => {
  const { keyword, category, sort, tags } = req.query;
  let queryObject = { isVerified: true };

  // Keyword Searching
  if (keyword) {
    queryObject.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { content: { $regex: keyword, $options: "i" } },
    ];
  }

  // Tags
  if(tags) {
    let tagsArray = tags.split(",").map((tag) => new RegExp(tag, "i"));
    console.log(tagsArray);
    queryObject.tags = { $all: tagsArray}
  }

  // Filter Category
  if (category) queryObject.category = category;

  // Sorting
  let sortMethod = "-createAt";
  if (sort === "old") {
    sortMethod = "createAt";
  }

  // Pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find(queryObject)
    .sort(sortMethod)
    .limit(limit)
    .skip(skip);

  return res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new CustomError.NotFoundError(`There is no post with id (${postId})`);
  }

  const { title, content, category, image, isVerified } = req.body;
  let updateObject = {};
  if (title) updateObject.title = title;
  if (content) updateObject.content = content;
  if (category) updateObject.category = category;
  if (image) updateObject.image = image;
  if (isVerified) updateObject.isVerified = isVerified;

  const updatedPost = await Post.findOneAndUpdate(
    { _id: postId },
    updateObject,
    { new: true, runValidators: true }
  );

  return res.status(StatusCodes.OK).json({ post: updatedPost });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;

  const deletedPost = await Post.findOneAndDelete({ _id: postId });

  return res
    .status(StatusCodes.OK)
    .json({ message: `${deletedPost.title} is removed` });
};

const getAllPostsAsAdmin = async (req, res) => {
  console.log("getAllPostsAsAdmin");
  const posts = await Post.find({});
  return res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

module.exports = {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
  getAllPostsAsAdmin,
};
