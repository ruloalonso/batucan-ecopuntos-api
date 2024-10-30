require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const join = require('path').join;
const fs = require('fs');
const mongoose = require("mongoose");
const cors = require('cors')

const app = express();

app.use(cors())

async function main() {
  await mongoose.connect(
    "mongodb+srv://ruloalonso:" +
      process.env.DB_PASS +
      "@batucan-ecopuntos.2srm9.mongodb.net/"
  );
  console.log("connected");
}

main().catch((err) => console.log(err));

const models = join(__dirname, "app/models");

// Bootstrap models
fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))
  .forEach((file) => require(join(models, file)));

const actionsRouter = require("./routes/actions.routes");
const usersRouter = require("./routes/users.routes");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/actions", actionsRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
