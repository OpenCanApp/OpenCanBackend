// Initialize
require("dotenv").config();
require("express-async-errors");
// ---------- Import ----------
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// Cloud Storage
const fileUpload = require("express-fileupload");
// Cloudinary and it's configuration
const { v2: cloudinary } = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Passport
const passport = require("passport");
const session = require("express-session");

// Security Packages
const cors = require("cors");

// MongoDB
const connectDB = require("./db/connect");

// Router
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// ---------- Middlewares ----------
let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));

// Server Listening
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    console.log("Connect to Database");
    app.listen(port, () => {
      console.log(`The server is running on port: ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
