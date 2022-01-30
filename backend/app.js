require('dotenv').config();
const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 3001,
  path = require("path"),
  apiRouter = require("./routes"),
  errorHandler = require("./errors/error-handler"),
  loginFilter = require("./middleware/login-filter"),
  cookieParser = require("cookie-parser");

app.use("/uploads", express.static(__dirname + "/uploads")); // Make uploads folder public
app.use(express.static("public")); // Make client public
app.use(express.json());
app.use(cookieParser());

// JWT authenticator
app.use("/api", loginFilter());

// API's
app.use("/api", apiRouter);

// For SPA support
app.all('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
