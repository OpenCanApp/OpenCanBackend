const express = require("express");
const router = express.Router();

const { createVote, getAllVotes, getSingleVote, updateVote, deleteVote } =
  require("../controllers").voteController;

const {
  authenticationMiddleware,
  permissionsMiddleware,
} = require("../middlewares");

router
  .route("/")
  .get(authenticationMiddleware, permissionsMiddleware("admin"), getAllVotes)
  .post(authenticationMiddleware, createVote);

router
  .route("/:id")
  .get(authenticationMiddleware, permissionsMiddleware("admin"), getSingleVote)
  .patch(authenticationMiddleware, permissionsMiddleware("admin"), updateVote)
  .delete(authenticationMiddleware, permissionsMiddleware("admin"), deleteVote);

module.exports = router;
