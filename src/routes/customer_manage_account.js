const express = require("express")
const customerManageAccountRouter = express.Router()
const User = require("../models/User")
const { Order }  = require("../models/order")
const { OrderItem } = require("../models/order")
const Product = require("../models/product")
const { Payment } = require("../models/order")
const { Cart } = require("../models/cart")
const moment = require('moment');
const cron = require('node-cron');

customerManageAccountRouter.use((req, res, next) => {
    if (req.isUnauthenticated()) {
        req.flash("info", "Please login first to manage your own account!")
        return res.redirect("/")
    }
    
    next()
})

customerManageAccountRouter.route("/").get(async(req, res) => {
    const orders = await Order.findAll({
        include: [
            {
                model: OrderItem,
                include: {
                    model: Product
                }
            },
        ],
        where: { UserId: req.user.id }
    });
    console.log(orders)
    res.render("./customers/page-profile-main", { orders })
})

customerManageAccountRouter.route("/edit").get(async (req, res) => {
    res.render("./customers/page-profile-edit")
}).post(async (req, res) => {
    const user = await User.findByPk(req.body.id)
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    if(req.body.password) {
        if(req.body.password != req.body.repeatpassword) {
            req.flash("error", "Repeat password must be the same as the password!")
        } else {
            user.password = req.body.password
           
        }
       
    }
    await user.save()
    return res.redirect("/account")
})

module.exports = customerManageAccountRouter