const express = require("express");
const router = express.Router();

const { showCurrentUser } = require("../controllers").userController;
const { authenticationMiddleware } = require("../middlewares");

router.get("/show-me", authenticationMiddleware, showCurrentUser);

module.exports = router;
