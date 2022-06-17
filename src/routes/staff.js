const express = require("express");
const { restart } = require("nodemon");
const User = require("../models/user");
const Voucher = require("../models/Voucher");
const staffRouter = express.Router();
const manageAccountRoute = require("./manage_accounts");
const manageVoucher = require("./manage_voucher");

const FAQrouter = require("./staff_FAQs");
const productRouter = require("./product");
const enableDebugMode = require("../configuration/settings");

staffRouter.use((req, res, next) => {
    enableDebugMode(false);
    next();
});

staffRouter.use((req, res, next) => {
    res.locals.path = req.baseUrl;
    console.log(req.baseUrl);

    next();
});

staffRouter.use("/accounts", manageAccountRoute);
staffRouter.use("/manage-vouchers", manageVoucher);
staffRouter.use("/accounts", manageAccountRoute);
staffRouter.use("/manage-faqs", FAQrouter);
staffRouter.use("/product", productRouter);

staffRouter.route("/").get((req, res) => {
    res.render("./staff/staff-charts");
});



module.exports = staffRouter;
