const express = require("express");
const customerRouter = express.Router();


customerRouter.use((req, res, next) => {
  if (!req.isAuthenticated()) {
      req.flash("info", "Please login first")
      res.redirect("/login")
  }
  next()
})


customerRouter.use((req, res, next) => {
  res.locals.path = req.baseUrl;
  console.log(req.baseUrl);
  next();
});

customerRouter.route("/").get((req, res) => {
  res.render("./customers/page-index-3");
});


module.exports = customerRouter;
