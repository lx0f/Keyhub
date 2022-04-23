const express = require("express");
const customerRouter = express.Router();

customerRouter.route("/").get((req, res) => {
    res.render("./customers/page-profile-main");
})

module.exports = customerRouter;