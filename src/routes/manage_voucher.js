const express = require("express");
const Voucher = require("../models/Voucher");
const manageVoucher = express.Router();
require('dotenv').config()
// let sendSmtpEmail = new Sib.SendSmtpEmail();
// const email = req.query.email;
// console.log(email)

manageVoucher.get('/deleteVoucher/:id', async function
(req, res) {
  try {
    let voucher = await Voucher.findByPk(req.params.id);
    let result = await Voucher.destroy({ where: { id: voucher.id } });
    console.log(result + ' video deleted');
    req.flash('success', 'Voucher Deleted');
    res.redirect('/staff/manage-vouchers');
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
  const coupon_id = req.body.coupon_id;
  const coupon_name = req.body.coupon_name;
  const coupon_value = req.body.coupon_value;
  const coupon_status = req.body.coupon_status;
  const coupon_desc = req.body.coupon_desc;
  const coupon_qty = req.body.coupon_qty;
  const start = req.body.start_date;
  const end = req.body.end_date; 
  const coupon_type = req.body.coupon_type;

  const voucher = await Voucher.findByPk(req.params.id);
  await voucher.update({
    coupon_id,
    coupon_name,
    coupon_value,
    coupon_status,
    coupon_desc,
    coupon_qty,
    start,
    end,
    coupon_type

  });

  req.flash("success", "Voucher updated!");
  res.redirect("/staff/manage-vouchers");

})

manageVoucher
  .route("/")
  .get(async (req, res) => {
    const voucher = await (await Voucher.findAll()).map((x) => x.dataValues);
    return res.render("./staff/voucher/voucher-table", { voucher });
  })


manageVoucher.route("/voucher-form").get((req, res) => {
// if (req.isUnauthenticated() || !req.user.isStaff) {
//   return res.redirect("/");
// }
// else {
  res.render("staff/voucher/voucher-form");
// }

}).post(async (req, res) => {
  try {
    Voucher.create({ coupon_name: req.body.coupon_name, coupon_value: req.body.coupon_value, coupon_id: req.body.coupon_id,coupon_status: req.body.coupon_status,coupon_qty:req.body.coupon_qty,coupon_desc:req.body.coupon_desc,start:req.body.start_date,end:req.body.end_date,coupon_type:req.body.coupon_type})
    req.flash("success", "Successfully create!")
    return res.redirect("/staff/manage-vouchers")
  } catch(e) {
        req.flash("error", e)
    }
});

module.exports = manageVoucher;
