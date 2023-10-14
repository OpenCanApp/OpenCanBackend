const express = require("express");
const router = express.Router();

const {
  getAllLocations,
  getSingleLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers").locationController;

const {
  authenticationMiddleware,
  permissionsMiddleware,
} = require("../middlewares");

router
  .route("/")
  .get(getAllLocations)
  .post(
    authenticationMiddleware,
    permissionsMiddleware("admin"),
    createLocation
  );

router
  .route("/:id")
  .get(getSingleLocation)
  .patch(
    authenticationMiddleware,
    permissionsMiddleware("admin"),
    updateLocation
  )
  .delete(
    authenticationMiddleware,
    permissionsMiddleware("admin"),
    deleteLocation
  );

module.exports = router;  