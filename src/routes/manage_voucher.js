const express = require("express");
const Voucher = require("../models/Voucher");
const manageVoucher = express.Router();

// manageVoucher
//   .route("/")
//   .get(async (req, res) => {
//     const users = await (await User.findAll()).map((x) => x.dataValues);
//     return res.render("./staff/staff-tables", { users });
//   })
//   .delete(async (req, res) => {
//     await User.destroy({ where: { id: req.body.id } });
//     req.flash("error", "Account has been deleted");
//     res.redirect("/staff/accounts");
//   })
//   .patch(async (req, res) => {
//     const user = await User.findByPk(req.body.id);
//     user.isStaff = req.body.isStaff || user.isStaff;
//     user.username = req.body.username || user.username;
//     user.email = req.body.email || user.email;
//     if (req.body.password) {
//       user.password = req.body.password; //unable to use short circuit eval as hashed password
//     }

//     await user.save();
//     req.flash("success", "User updated!");
//     res.redirect("/staff/accounts");
//   });
manageVoucher.get('/deleteVoucher/:id', async function
(req, res) {
  try {
    let voucher = await Voucher.findByPk(req.params.id);
    // if (!video) {
    //   flashMessage(res, 'error', 'Video not found');
    //   res.redirect('/video/listVideos');
    //   return;
    // }
    // if (req.user.id != video.userId) {
    //   flashMessage(res, 'error', 'Unauthorised access');
    //   res.redirect('/voucher/voucher-table');
    //   return;
    // }
    let result = await Voucher.destroy({ where: { id: voucher.id } });
    console.log(result + ' video deleted');
    req.flash('success', 'Voucher Deleted');
    res.redirect('/staff/voucher-table');
    }
    catch (err) {
      console.log(err);
  }
});
manageVoucher.get('/editVoucher/:id', (req, res) => {
  Voucher.findByPk(req.params.id)
  .then((voucher) => {
    res.render('./staff/voucher/voucher-edit', { voucher });
  })
  .catch(err => console.log(err));
});

manageVoucher.post('/editVoucher/:id', async (req, res) => {
  const id = req.body.id;
  const coupon_id = req.body.coupon_id;
  const coupon_name = req.body.coupon_name;
  const coupon_value = req.body.coupon_value;
  const coupon_status = req.body.coupon_status;

  const voucher = await Voucher.findByPk(id);
  await voucher.update({
    coupon_id,
    coupon_name,
    coupon_value,
    coupon_status
  });

  req.flash("success", "Voucher updated!");
  res.redirect("/staff/voucher-table");

})

manageVoucher
  .route("/")
  .get(async (req, res) => {
    const voucher = await (await Voucher.findAll()).map((x) => x.dataValues);
    return res.render("./staff/voucher/voucher-table", { voucher });
  })


manageVoucher.route("/voucher-form").get((req, res) => {
if (req.isUnauthenticated() || !req.user.isStaff) {
  return res.redirect("/");
}
else {
  res.render("staff/voucher/voucher-form");
}

}).post(async (req, res) => {
  try {
    Voucher.create({ coupon_name: req.body.coupon_name, coupon_value: req.body.coupon_value, coupon_id: req.body.coupon_id,coupon_status: req.body.coupon_status })
    req.flash("success", "Successfully create!")
    return res.redirect("/staff")
  } catch(e) {
        req.flash("error", e)
    }
});

module.exports = manageVoucher;
