const express = require("express");
const staffRouter = express.Router();

staffRouter.use((req, res, next) => {
    res.locals.path = req.baseUrl
    console.log(req.baseUrl)
   
    next()
  })

staffRouter.route("/").get((req, res) => {
    res.render("./staff/staff-charts")
})

module.exports = staffRouter;