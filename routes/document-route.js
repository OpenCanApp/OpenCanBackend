const express = require("express");
const router = express.Router();

const {
  getAllDocuments,
  getSingleDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} = require("../controllers").documentController;

const {
  authenticationMiddleware,
  permissionsMiddleware,
} = require("../middlewares");

router
  .route("/")
  .get(getAllDocuments)
  .post(createDocument);

router
  .route("/:id")
  .get(getSingleDocument)
  .patch(authenticationMiddleware, permissionsMiddleware("admin"), updateDocument)
  .delete(authenticationMiddleware, permissionsMiddleware("admin"), deleteDocument)

module.exports = router;  