const express = require("express");
const { restart } = require("nodemon");
const User = require("../models/user");
const Voucher = require("../models/Voucher");
const staffRouter = express.Router();
const manageAccountRoute = require("./manage_accounts")
const manageVoucher = require("./manage_voucher")


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


staffRouter.use("/accounts", manageAccountRoute)
staffRouter.use("/manage-vouchers", manageVoucher)


staffRouter.route("/").get((req, res) => {
  res.render("./staff/staff-charts");
});

;

// staffRouter.route("/voucher-form").get((req, res) => {
//   if (req.isUnauthenticated() || !req.user.isStaff) {
//     return res.redirect("/");
//   }
//   else {
//     res.render("staff/voucher/voucher-form");
//   }

// }).post(async (req, res) => {
//   try {
//     Voucher.create({ coupon_name: req.body.coupon_name, coupon_value: req.body.coupon_value, coupon_id: req.body.coupon_id,coupon_status: req.body.coupon_status })
//     req.flash("success", "Successfully create!")
//     return res.redirect("/staff")
//   } catch(e) {
//         req.flash("error", e)
//     }
// });
// staffRouter.route("/voucher-table/:id").get((req, res) => {
//   req.flash("danger", "Successfully delete!")
// }).delete(async (req, res) => {
//   await Voucher.destroy({ where: { id: req.body.id } });
//   req.flash("error", "Account has been deleted");
//   res.redirect("./staff/voucher/voucher-table");;
// });



  
  // .delete(async (req, res) => {
  //   await User.destroy({ where: { id: req.body.id } });
  //   req.flash("error", "Account has been deleted");
  //   res.redirect("/staff/accounts");
  // })
  // .patch(async (req, res) => {
  //   const user = await User.findByPk(req.body.id);
  //   user.isStaff = req.body.isStaff || user.isStaff;
  //   user.username = req.body.username || user.username;
  //   user.email = req.body.email || user.email;
  //   if (req.body.password) {
  //     user.password = req.body.password; //unable to use short circuit eval as hashed password
  //   }

  //   await user.save();
  //   req.flash("success", "User updated!");
  //   res.redirect("/staff/accounts");
  // });


module.exports = staffRouter;
