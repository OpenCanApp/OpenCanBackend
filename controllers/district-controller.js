const { District } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createDistrict = async (req, res) => {
  console.log(req.body);
  const newDistrict = await District.create(req.body);
  console.log(newDistrict);
  return res.status(StatusCodes.CREATED).json({ district: newDistrict });
};

const getSingleDistrict = async (req, res) => {
  const { id: districtId } = req.params;
  const district = await District.findOne({ _id: districtId });

  if (!district) {
    throw new CustomError.NotFoundError(
      `There is no district with id (${districtId})`
    );
  }

  return res.status(StatusCodes.OK).json({ district });
};

const getAllDistricts = async (req, res) => {
  const { keyword, sort } = req.query;
  let queryObject = {};

  if (keyword) queryObject.name = { $regex: keyword, $options: "i" };
  let sortMethod = "name";
  if (sort === "safety") {
    sortMethod = "safety";
  } else if (sort === "transport") {
    sortMethod = "transport";
  } else if (sort === "shopping") {
    sortMethod = "shopping";
  } else if (sort === "foods") {
    sortMethod = "foods";
  } else if (sort === "rent") {
    sortMethod = "rent";
  }

  const districts = await District.find(queryObject).sort(sortMethod);

  return res
    .status(StatusCodes.OK)
    .json({ districts, count: districts.length });
};

const updateDistrict = async (req, res) => {
  const { id: districtId } = req.params;

  const district = await District.findOne({ _id: districtId });

  if (!district) {
    throw new CustomError.NotFoundError(
      `There is no district with id (${districtId})`
    );
  }

  const updatedDistrict = await District.findOneAndUpdate(
    { _id: districtId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(StatusCodes.OK).json({ district: updatedDistrict });
};

const deleteDistrict = async (req, res) => {
  const { id: districtId } = req.params;

  const deletedDistrict = await District.findOneAndDelete({ _id: districtId });

  return res
    .status(StatusCodes.OK)
    .json({ message: `${deletedDistrict.name} is removed` });
};

module.exports = {
  createDistrict,
  getSingleDistrict,
  getAllDistricts,
  updateDistrict,
  deleteDistrict,
};
