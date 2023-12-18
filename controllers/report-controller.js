const CustomError = require("../errors");
const { Report } = require("../models");
const { StatusCodes } = require("http-status-codes");

const createReport = async (req, res) => {
  const { userId } = req.user;
  req.body.user = userId;

  const newReport = await Report.create(req.body);

  return res.status(StatusCodes.CREATED).json({ report: newReport });
};

const getAllReports = async (req, res) => {
  const { keyword, status, sort } = req.query;
  let queryObject = {};

  // Keyword Searching
  if (keyword) {
    queryObject.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { content: { $regex: keyword, $options: "i" } },
    ];
  }

  // Status
  if (status) queryObject.status = status;

  // Sorting
  let sortMethod = "-createAt";
  if (sort === "old") {
    sortMethod = "createAt";
  }

  // Pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  const reports = await Report.find(queryObject)
    .sort(sortMethod)
    .limit(limit)
    .skip(skip);

  return res.status(StatusCodes.OK).json({reports, count: reports.length}); 
};

const getSingleReport = async (req, res) => {
  const { id: reportId } = req.params;

  const report = await Report.findOne({ _id: reportId });

  if (!report) {
    throw CustomError.NotFoundError(`There is no report with id (${reportId})`);
  }

  return res.status(StatusCodes.OK).json({ report });
};

const updateReport = async (req, res) => {
  const { id: reportId } = req.params;
  const report = await Report.findOne({ _id: reportId });

  if (!report) {
    throw CustomError.NotFoundError(`There is no report with id (${reportId})`);
  }

  const updatedReport = await Report.findOneAndUpdate(
    { _id: reportId },
    req.body,
    { new: true }
  );

  return res.status(StatusCodes.OK).json({ report: updatedReport });
};

const deleteReport = async (req, res) => {
  const { id: reportId } = req.params;

  const deletedReport = await Report.findOneAndDelete({ _id: reportId });

  return res.status(StatusCodes.OK).json({
    message: `${deletedReport.title} is removed`,
  });
};

module.exports = {
  createReport,
  getAllReports,
  getSingleReport,
  updateReport,
  deleteReport,
};
