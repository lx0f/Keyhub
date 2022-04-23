//Library Imports
const express = require("express");
const path = require("path");
const handlebars = require("handlebars");
const express_handlebars = require("express-handlebars");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//Local Imports
const customerRouter = require("./routes/customer");

//Initialization of the app
const app = express();

app.use("/", customerRouter);

app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.urlencoded({ extended: false }));



app.set("view engine", "handlebars");

app.set("views", path.join(__dirname, "../views"));

app.engine(
  "handlebars",
  engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    defaultLayout: "page-layout",
  })
);

module.exports = app;
