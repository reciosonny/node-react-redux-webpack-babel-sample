const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const Helpers = require("./helpers");

const app = express();

const middlewares = [bodyParser.urlencoded(), bodyParser.json(), cors()];
app.use(middlewares);


// #region mongoose configuration
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://reciosonny:abcd1234@ds121311.mlab.com:21311/sample-db", { useFindAndModify: false });

require('./models/Employees');
// #endregion

//#region Initialize Controller

const employeesController = Helpers.controllerMiddleware(require('./controllers/employeesController')(mongoose));

//#endregion

//#region INITIALIZE ROUTES
require("./routes/employeeRoutes")(app, employeesController);
//#endregion


app.get("/", (req, res) => {
  res.send("hello world!")
});
app.get("/api", (req, res) => {
  res.send("hello API!")
});
app.get("/api/users/:id", (req, res) => {

  const { userId, name } = req.body;
  const { id } = req.params;

  res.send({ id, userId, name });
});

app.get("/testing", (req, res) => {
  res.send("testing node server")
});

module.exports = app;