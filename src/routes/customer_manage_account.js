const express = require("express")
const fs = require('fs');
const upload = require('../configuration/imageUpload');
const customerManageAccountRouter = express.Router()
const User = require("../models/User")

customerManageAccountRouter.use((req, res, next) => {
    if (req.isUnauthenticated()) {
        req.flash("info", "Please login first to manage your own account!")
        return res.redirect("/")
    }
    
    next()
})

customerManageAccountRouter.route("/").get((req, res) => {
    res.render("./customers/page-profile-main")
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

customerManageAccountRouter.route("/edit-image").post(async (req, res) => { 
    if (!fs.existsSync('./public/uploads/' + req.user.id)) {
        fs.mkdirSync('./public/uploads/' + req.user.id, { recursive:
        true });
        }
        upload(req, res, (err) => {
        if (err) {
        // e.g. File too large
        res.json({ file: '/img/no-image.jpg', err: err });
        }
        else {
        res.json({ file: `/uploads/${req.user.id}/${req.file.filename}` });
        }
        });
    print('hi')
})

module.exports = customerManageAccountRouter