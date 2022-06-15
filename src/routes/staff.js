const express = require("express");
const { restart } = require("nodemon");
const User = require("../models/user");
const staffRouter = express.Router();
const manageAccountRoute = require("./manage_accounts")
const FAQrouter = require("./FAQs")

staffRouter.use((req, res, next) => {
  if (req.isUnauthenticated() || !req.user.isStaff) {
    return res.redirect("/");
  }
  next();
});

staffRouter.use((req, res, next) => {
  res.locals.path = req.baseUrl;
  console.log(req.baseUrl);

  next();
});


staffRouter.use("/accounts", manageAccountRoute )
staffRouter.use("/manage-faqs", FAQrouter)
//staffRouter.use("/produc",productRouter)


staffRouter.route("/").get((req, res) => {
  res.render("./staff/staff-charts");
});



module.exports = staffRouter;
