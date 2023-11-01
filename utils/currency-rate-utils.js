const { Currency } = require("../models");
const CustomError = require("../errors");
const axios = require("axios");

const getCurrencyRate = async () => {
  const response = await axios.get(
    `${process.env.CURRENCY_RATE_URL}${process.env.CURRENCY_RATE_API_KEY}`
  );

  if (!response.status === 200) {
    throw new CustomError.BadRequestError(`Cannot get the currency rates`);
  }

  // await Currency.removeAllCurrency();

  let base = response.data.base;
  let rates = response.data.rates;

  for (const key in rates) {
    await Currency.removeACurrency(key);
    const currency = await Currency.create({
      currency: key,
      base,
      rate: rates[key],
    });
  }
  console.log("Updated Currency Rates");
};

module.exports = getCurrencyRate;
