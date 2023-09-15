const express = require("express");
const router = express.Router();

const {
  createDistrict,
  getSingleDistrict,
  getAllDistricts,
  updateDistrict,
  deleteDistrict,
} = require("../controllers").districtController;

const {
  authenticationMiddleware,
  permissionsMiddleware,
} = require("../middlewares");

router
  .route("/")
  .get(getAllDistricts)
  .post(
    authenticationMiddleware,
    permissionsMiddleware("admin"),
    createDistrict
  );

router
  .route("/:id")
  .get(getSingleDistrict)
  .patch(
    authenticationMiddleware,
    permissionsMiddleware("admin"),
    updateDistrict
  )
  .delete(
    authenticationMiddleware,
    permissionsMiddleware("admin"),
    deleteDistrict
  );

module.exports = router;
