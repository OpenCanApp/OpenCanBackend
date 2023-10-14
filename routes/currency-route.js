const express = require("express");
const router = express.Router();

const { getAllCurrencyRates, getSingleCurrencyRate } =
  require("../controllers").currencyController;
  
router.route("/").get(getAllCurrencyRates);

router.route("/:currency").get(getSingleCurrencyRate);

module.exports = router;