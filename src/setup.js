//Imports
const express = require("express");
const path = require("path");
const handlebars = require("handlebars");
const express_handlebars = require("express-handlebars");
const { engine } = require("express-handlebars")
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access")

//Initialization of the app
const app = express();

app.use(express.static(path.join(__dirname, "../public")))

app.use(bodyParser.urlencoded({extended: false}));

app.use(flash())

app.set("view engine", "handlebars")

app.set("views", path.join(__dirname, "../views"))

app.engine("handlebars", engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    defaultLayout: ""
}))



module.exports = app;
