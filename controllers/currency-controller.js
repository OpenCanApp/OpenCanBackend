const { Currency } = require("../models");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllCurrencyRates = async (req, res) => {
  console.log("All Currency Rate")
  const rates = await Currency.find({});

  return res.status(StatusCodes.OK).json({ rates, count: rates.length });
};

const getSingleCurrencyRate = async (req, res) => {
  let { currency } = req.params;
  currency = currency.toUpperCase();

  const rate = await Currency.findOne({currency});

  if (!rate) {
    throw new CustomError.NotFoundError(`There is no currency rate with name ${currency}`);
  }

  return res.status(StatusCodes.OK).json({rate});
}

module.exports = {
  getAllCurrencyRates,
  getSingleCurrencyRate
}