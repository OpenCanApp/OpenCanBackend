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
// Get News, Currency Rates Method
const { getNews, getCurrencyRate, getTweet } = require("./utils");
// Router
const {
  authRouter,
  userRouter,
  postRouter,
  districtRouter,
  voteRouter,
  newsRouter,
  currencyRouter,
  documentRouter,
  locationRouter,
  commentRouter,
  tweetRouter,
} = require("./routes");
// Middleware
const { notFoundMiddleware, errorHandlerMiddleware } = require("./middlewares");

// ---------- Middlewares ----------
let app = express();
// Passport
require("./configs/passport");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static("./public"));

// Routing
app.get("/login-page", (req, res) => {
  const publicPath = path.join(__dirname, "public");
  res.sendFile(path.join(publicPath, "login-page.html"));
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/district", districtRouter);
app.use("/api/vote", voteRouter);
app.use("/api/news", newsRouter);
app.use("/api/currency", currencyRouter);
app.use("/api/document", documentRouter);
app.use("/api/location", locationRouter);
app.use("/api/comment", commentRouter);

// Not Found Handler
app.use(notFoundMiddleware);
// Error Handler
app.use(errorHandlerMiddleware);

// ---------- Server Listening ---------
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

// Export the Express API for Vercel
module.exports = app;
