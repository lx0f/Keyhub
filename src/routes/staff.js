const express = require("express");
const enableDebugMode = require("../configuration/settings");

const manageAccountRoute = require("./manage_accounts");
const manageTicketRoute = require("./manage_tickets");
const FAQrouter = require("./staff_FAQs");
const productRouter = require("./product");
const staffpeRouter = require("./staff_pe")

const staffRouter = express.Router();

const enableDebugMode = require("../configuration/settings")

staffRouter.use((req, res, next) => {
    if (req.isUnauthenticated() || !req.user.isStaff) {
        return res.redirect("/");
    }
    next();
});

staffRouter.use((req, res, next) => {
    enableDebugMode(false);
    next();
});

staffRouter.use((req, res, next) => {
    res.locals.path = req.baseUrl;
    console.log(req.baseUrl);

staffRouter.use("/accounts", manageAccountRoute )
staffRouter.use("/manage-faqs", FAQrouter)
staffRouter.use("/product", productRouter)
staffRouter.use("/manage-pe", staffpeRouter)
    next();
});

staffRouter.use("/accounts", manageAccountRoute);
staffRouter.use("/tickets", manageTicketRoute);
staffRouter.use("/accounts", manageAccountRoute);

staffRouter.use("/manage-faqs", FAQrouter);
staffRouter.use("/product", productRouter);

staffRouter.route("/").get((req, res) => {
    res.render("./staff/staff-charts");
});

module.exports = staffRouter;
