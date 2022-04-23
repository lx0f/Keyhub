const express = require("express");
const customerRouter = express.Router();

customerRouter.route("/").get((req, res) => {
    res.send("test");
})

module.exports = customerRouter;