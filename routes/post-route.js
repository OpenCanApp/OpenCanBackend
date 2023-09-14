const express = require("express");
const router = express.Router();

const {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
  getAllPostsAsAdmin,
} = require("../controllers").postController;
const {
  authenticationMiddleware,
  permissionsMiddleware,
} = require("../middlewares");

router
  .route("/")
  .get(authenticationMiddleware, getAllPosts)
  .post(authenticationMiddleware, createPost);

router
  .route("/show-all")
  .get(
    authenticationMiddleware,
    permissionsMiddleware("admin"),
    getAllPostsAsAdmin
  );
router
  .route("/:id")
  .get(getSinglePost)
  .patch(authenticationMiddleware, permissionsMiddleware("admin"), updatePost)
  .delete(authenticationMiddleware, permissionsMiddleware("admin"), deletePost);

module.exports = router;
