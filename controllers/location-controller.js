const { Location } = require("../models");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllLocations = async (req, res) => {
  const { keyword, category, province, city } = req.query;
  let queryObject = {};

  if (keyword) {
    queryObject.$or = [
      { topic: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  if (category) queryObject.category = category;
  if (province) queryObject.province = province.toUpperCase();
  if (city) queryObject.city = { $regex: city, $options: "i" };

  const locations = await Location.find(queryObject);
  res.status(StatusCodes.OK).json({ locations, count: locations.length });
};

const getSingleLocation = async (req, res) => {
  const { id: locationId } = req.params;
  const foundLocation = await Location.findOne({ _id: locationId });
  if (!foundLocation) {
    throw new CustomError.NotFoundError(
      `There is no location with id ${locationId}`
    );
  }

  res.status(StatusCodes.OK).json({ location: foundLocation });
};

const createLocation = async (req, res) => {
  const newLocation = await Location.create(req.body);
  res.status(StatusCodes.CREATED).json({ location: newLocation });
};

const updateLocation = async (req, res) => {
  const { id: locationId } = req.params;
  const foundLocation = await Location.findOne({ _id: locationId });

  if (!foundLocation) {
    throw new CustomError.NotFoundError(
      `There is no location with id ${locationId}`
    );
  }

  const updatedLocation = await Location.findOneAndUpdate(
    { _id: locationId },
    req.body,
    { new: true, runValidators: true }
  );

  return res.status(StatusCodes.OK).json({location: updatedLocation})
};

const deleteLocation = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "deleteLocation" });
};

module.exports = {
  getAllLocations,
  getSingleLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
