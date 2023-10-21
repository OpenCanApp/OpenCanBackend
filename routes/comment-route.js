const express = require("express");
const router = express.Router();

const { createComment, getAllComments, getSingleComment, deleteVote, updateComment } =
  require("../controllers").commentController;

const {
  authenticationMiddleware,
  permissionsMiddleware,
} = require("../middlewares");

router
  .route("/")
  .get(getAllComments)
  .post(authenticationMiddleware, createComment);

router
  .route("/:id")
  .get(authenticationMiddleware, getSingleComment)
  .patch(authenticationMiddleware, updateComment)
  .delete(authenticationMiddleware, permissionsMiddleware("admin"), deleteVote)  

module.exports = router;
