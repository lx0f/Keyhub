const express = require("express");
const FAQs = require("../models/FAQs");
const customerRouter = express.Router();
const FAQrouter = require("./FAQs")

/*customerRouter.use((req, res, next) => {
  if (!req.isAuthenticated()) {
      return res.redirect("/login")
  }
  
  next()
})*/

/** FAQs Customer Site**/
FAQrouter.get('/faqs-cust',async (req, res) => {
  const faqs = await (await FAQs.findAll()).map((x) => x.dataValues);
  return res.render("./customers/page-faqs", { faqs });
  })
  
customerRouter.use((req, res, next) => {
  res.locals.path = req.baseUrl;
  console.log(req.baseUrl);
  next();
});

customerRouter.route("/logout").get((req, res) => {
  req.logOut();
  res.redirect("/login")
})

customerRouter.route("/").get((req, res) => {
  res.render("./customers/page-index-3");
});


module.exports = customerRouter;
