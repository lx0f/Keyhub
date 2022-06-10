const express = require("express")
const User = require("../models/User")
const manageAccountRoute = express.Router()
manageAccountRoute
  .route("/")
  .get(async (req, res) => {
      const users = await (await User.findAll()).map((x) => x.dataValues);
      return res.render("./staff/staff-tables", { users });
    
  })
  .post((req, res) => {});

manageAccountRoute.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    if(user) {
    return res.render("./staff/staff-manage-account", {
      user: user.dataValues, //what happens when no id
    });
}
req.flash("error", "No such account!")
return res.redirect("/staff")
})

module.exports = manageAccountRoute