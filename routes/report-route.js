const express = require("express");
const router = express.Router();

const {
  createReport,
  getAllReports,
  getSingleReport,
  updateReport,
  deleteReport,
} = require("../controllers").reportController;

const {
  authenticationMiddleware,
  permissionsMiddleware,
} = require("../middlewares");

router
  .route("/")
  .get(authenticationMiddleware, permissionsMiddleware("admin"), getAllReports)
  .post(authenticationMiddleware, createReport);

router
  .route("/:id")
  .get(
    authenticationMiddleware,
    permissionsMiddleware("admin"),
    getSingleReport
  )
  .patch(authenticationMiddleware, permissionsMiddleware("admin"), updateReport)
  .delete(
    authenticationMiddleware,
    permissionsMiddleware("admin"),
    deleteReport
  );

module.exports = router;
