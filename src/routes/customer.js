const express = require("express");
const customerRouter = express.Router();

customerRouter.use((req, res, next) => {
  res.locals.path = req.baseUrl;
  console.log(req.baseUrl);

  next();
});

customerRouter.route("/").get((req, res) => {
  res.render("./customers/page-profile-main");
});



module.exports = customerRouter;
