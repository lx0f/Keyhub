const communityRouter = require("express").Router()

communityRouter.route("/").get((req, res) => {
    res.render("./customers/page-community")
   
})

module.exports = communityRouter