const express = require("express");
const db = require("../models/database_setup")
const User = require("../models/User")
const passport = require("passport")
const Mail = require("../configuration/nodemailer")
const loginRouter = express.Router();



/*loginRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash("info", "You have already logged in. Please logout first")
        res.redirect("/")
    }
    
    next()
})*/

loginRouter.route("/register").get((req, res) => {
    res.render("./customers/page-user-register");
}).post(async (req, res) => {
    try {
        if (req.body.repeatpassword != req.body.password) {
            req.flash("error", "Your repeat password and password are not the same!")
            return res.redirect("/register")
        }
        else if(await User.findOne({where: {email: req.body.email }})) {
            req.flash("error", "Email is not unique!")
            return res.redirect("/register")
        } 
        User.create({username: req.body.username, email: req.body.email, password: req.body.password, isStaff: false})
        req.flash("success", "Successfully registered!")
        return res.redirect("/login")
    } catch(e) {
        req.flash("error", e)
    }

})

loginRouter.route("/login-google").get( passport.authenticate("google", {scope: ['profile', 'email']}))
loginRouter.route("/login-google/callback").get(passport.authenticate('google', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true
}), (req, res) => {
    res.redirect("/")
})


loginRouter.route("/login").get((req, res) => {
 
    res.render("./customers/page-user-login")
}).post(passport.authenticate(["local", "anonymous"], {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true
}), (req, res) => {
    req.flash("error", "No such account")
    res.redirect("/login")
})


loginRouter.route("/reset-password").get(async (req, res) => {
    res.render("./customers/page-reset-password")
}).post(async (req, res) => {
    const user = await User.findOne({where: {email: req.body.email}})
    if(user) {
        user.generateResetToken()
        const link = `http://localhost:3000/reset-password/${user.id}/${user.resetTokenID}`
        Mail.send(res, {to: user.email , subject: "Your Reset Link", text: link})

    }
  
    req.flash("success", "Reset link to your email sent! Please check your email.")
    res.redirect("/reset-password")
})


loginRouter.route("/reset-password/:id/:uuid").get((req, res) => {
res.send('hi')
})


module.exports = loginRouter;