const express = require("express");
const loginRouter = express.Router();


loginRouter.route("/register").get((req, res) => {
    res.render("./customers/page-user-register");
})

module.exports = loginRouter;