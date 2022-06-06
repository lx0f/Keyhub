//Library Imports
const express = require("express");
const flash = require("connect-flash")
const path = require("path");
const session = require("express-session")
const handlebars = require("handlebars");
const express_handlebars = require("express-handlebars");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//Local Imports
const initaliseDatabase = require("./models/initalise_database")
const customerRouter = require("./routes/customer");
const staffRouter = require("./routes/staff");
const loginRouter = require("./routes/login");


//Initialisation of the app
const app = express();

//Initalisation of the database
initaliseDatabase()

//Setup
app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret:"keyhub",
  resave: false,
  saveUninitialized: false
}))

app.use(flash())

app.set("view engine", "handlebars");

app.set("views", path.join(__dirname, "../views"));

app.engine(
  "handlebars",
  engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    defaultLayout: "page-layout",
    helpers: {
      equals(arg1, arg2, options) {
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
      },

    },
  })
);

//Global variables (middleware)
app.use((req, res, next) => {
  res.locals.error = req.flash("error")
  res.locals.info = req.flash("info")
  res.locals.success = req.flash("success")

  next()
})

//Routers
app.use("/staff", staffRouter);
app.use("/", loginRouter);
app.use("/", customerRouter);


//Export to app.js
module.exports = app;
