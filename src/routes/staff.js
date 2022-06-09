const express = require("express");
const { restart } = require("nodemon");
const User = require("../models/user");
const staffRouter = express.Router();

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

staffRouter.route("/").get((req, res) => {
  res.render("./staff/staff-charts");
});

staffRouter
  .route("/manage_accounts")
  .get(async (req, res) => {
    if(!req.query.id) {
    const users = await (await User.findAll()).map(x => x.dataValues)
    return res.render("./staff/staff-tables", {users});
    } else {
    id = req.query.id
    const user = await User.findOne({where: {id}})
    return res.render("./staff/staff-manage-account", {user: user.dataValues})
    }
  })
  .post((req, res) => {

  });


module.exports = staffRouter;
