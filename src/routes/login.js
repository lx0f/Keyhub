const express = require("express");
const loginRouter = express.Router();


loginRouter.route("/register").get((req, res) => {
    res.render("./customers/page-user-register");
}).post((req, res) => {
    res.redirect("/login")
})

loginRouter.route("/login").get((req, res) => {
    res.render("./customers/page-user-login")
}).post((req, res) => {
    
})

module.exports = loginRouter;