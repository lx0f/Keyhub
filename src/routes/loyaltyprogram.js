const express = require('express');
const User = require('../models/User');
const LoyaltyCard = require('../models/LoyaltyCard');
const { CustomerVoucher } = require('../models/CustomerVoucher');
const { VoucherItem } = require('../models/CustomerVoucher');
const Voucher = require('../models/Voucher');
const Redeemables = require('../models/Redeemables');
const { Mail, transporter } = require('../configuration/nodemailer');
const moment = require('moment');
const url = require('url');
const { Usertraffic, Individualtraffic } = require("../models/Usertraffic");

const loyaltyprogram = express.Router();

loyaltyprogram.get('/signup', async (req, res) => {
    try {
        if (req.user) {
            const user_id = req.user.id;

            const User_Card = await LoyaltyCard.findAll({
                where: { authorID: user_id },
            });
            if (User_Card) {
                return res.render('./customers/loyaltyprogram/signup', {
                    User_Card,
                });
            } else {
                return res.render('./customers/loyaltyprogram/signup');
            }
        } else {
            return res.render('./customers/loyaltyprogram/signup');
        }
    } catch (e) {
        req.flash('error', 'error error');
    }
});
loyaltyprogram.post('/signup', async (req, res) => {
    try {
        if (req.user) {
            let user_id = req.user.id;
            if (await LoyaltyCard.findOne({ where: { authorID: user_id } })) {
                return res.redirect('/account/loyaltyprogram');
            } else {
                await LoyaltyCard.create({
                    Active_Points: 0,
                    Expired_Points: 0,
                    Used_Points: 0,
                    Total_Points: 0,
                    Status: 'Bronze',
                    authorID: user_id,
                    Activation: 'Off',
                });
                const link = `http://localhost:3000/loyaltyprogram/confirmation/${req.user.id}`;

                Mail.Send({
                    email_recipient: req.user.email,
                    subject: 'Your Confirmation Link',
                    template_path:
                        '../../views/customers/loyaltyprogram/confirmation.html',
                    context: { link },
                });
                // await LoyaltyCard.create({ authorID: req.user.id,Active_Points: 0, Expired_Points: 0, Used_Points: 0,Status:"Bronze",Total_Points:0});
                req.flash(
                    'success',
                    'Please click on the confirmation in the email of user ' +
                        req.user.email
                );
                return res.redirect('/account/loyaltyprogram');
            }
        } else {
            return res.redirect('/login');
        }
    } catch (e) {
        req.flash('error', 'error error');
    }
});
loyaltyprogram.get('/confirmation/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (
        await LoyaltyCard.findOne({
            where: { authorID: user.id, Activation: 'On' },
        })
    ) {
        return res.render('./customers/loyaltyprogram/thankyou');
    } else {
        const User_Card = await LoyaltyCard.findOne({
            where: { authorID: user.id },
        });
        await User_Card.update({ Activation: 'On' });
        return res.render('./customers/loyaltyprogram/thankyou');
    }
});

loyaltyprogram.get('/redeem', async (req, res) => {
    try {
        if (req.user) {
            
            var pathUrl = req.originalUrl
            const find_traffic = await Usertraffic.findOne({ where: { path: pathUrl } })
            var now = moment().format('YYYY-MM-DD HH:mm:ss');

            if (find_traffic) {
                const indviudal_traffic = await Individualtraffic.findOne({ where: { path: find_traffic.path, UserId: req.user.id } })
                if (indviudal_traffic) {
                    var latestvisit = moment(indviudal_traffic.latestvisit).format('YYYY-MM-DD HH:mm:ss');
                    var minute = moment(now).diff(moment(latestvisit), 'minutes');
                    console.log(minute);
                    if (minute >= 3) {
                
                        find_traffic.update({ pathcount: find_traffic.pathcount + 1 })
                        indviudal_traffic.update({ latestvisit: now, visitcount: indviudal_traffic.visitcount + 1 })
                    }
                } else {
                    find_traffic.update({ pathcount: find_traffic.pathcount + 1, usercount: find_traffic.usercount + 1 })
                    await Individualtraffic.create({ UserId: req.user.id, path: find_traffic.path, visitcount: 1, latestvisit: now })
                }
        
            } else {
                await Usertraffic.create({ UserId: req.user.id, path: pathUrl, pathcount: 1, usercount: 1 })
                const new_traffic = await Usertraffic.findOne({ where: { path: pathUrl } })

                await Individualtraffic.create({ UserId: req.user.id, path: new_traffic.path, visitcount: 1, latestvisit: now })
            }
    
            let user_id = req.user.id;
            const User_Card = await LoyaltyCard.findAll({
                where: { authorID: user_id },
            });
            const Redeemable_items = (await Redeemables.findAll()).map(
                (x) => x.dataValues
            );

            const voucherlist = await CustomerVoucher.findAll({
                include: ['voucheritem', { model: User }],
            });

            const voucher = await (
                await Voucher.findAll()
            ).map((x) => x.dataValues);
            const voucheritem = await (
                await VoucherItem.findAll()
            ).map((x) => x.dataValues);

            return res.render('./customers/loyaltyprogram/redeem', {
                User_Card,
                voucherlist,
                voucher,
                Redeemable_items,
                voucheritem,
            });
        } else {
            const voucher = await (
                await Voucher.findAll()
            ).map((x) => x.dataValues);
            res.render('./customers/loyaltyprogram/redeem', { voucher });
        }
    } catch (e) {
        console.log(e);
    }
});

// redeem voucher
loyaltyprogram.post('/redeem', async (req, res) => {
    try {
        if (req.user) {
            let list = {};
            const voucherlist = await CustomerVoucher.findOne({
                where: {
                    UserID: req.user.id || 0,
                },
            });
            list = voucherlist;
            // find items in voucher list
            const item = await VoucherItem.findOne({
                where: {
                    VoucherListId: voucherlist.id,
                    VoucherId: req.body.voucherID,
                },
            });
            const voucher = await Voucher.findByPk(req.body.voucherID);
            // update voucher data

            if (
                req.body.status == 'Inactive' ||
                voucher.voucher_used >= voucher.total_voucher
            ) {
                req.flash(
                    'error',
                    `${voucher.voucher_title} Voucher has been fully redeemed!`
                );
                return res.redirect('/loyaltyprogram/redeem');
            }
            if (item) {
                req.flash(
                    'error',
                    `${voucher.voucher_title} Voucher has been already been redeemed`
                );
                return res.redirect('/loyaltyprogram/redeem');
            } else {
                const Redeemcount = await Redeemables.findOne({
                    where: { VoucherId: voucher.id },
                });
                const User_Card = await LoyaltyCard.findOne({
                    where: { authorID: req.user.id },
                });

                if (User_Card.Active_Points < req.body.redeem) {
                    req.flash('error', 'Not Enough Points! ');
                    return res.redirect('/loyaltyprogram/redeem');
                } else {
                    const item = await VoucherItem.create({
                        VoucherListId: voucherlist.id,
                        VoucherId: req.body.voucherID,
                        Type: 'Reward',
                        usage: 0,
                    });
                    const active_points =
                        parseInt(User_Card.Active_Points) -
                        parseInt(req.body.redeem);
                    const used_points =
                        parseInt(User_Card.Used_Points) +
                        parseInt(req.body.redeem);
                    if (active_points + used_points <= 500) {
                        await User_Card.update({
                            Active_Points: active_points,
                            Expired_Points: User_Card.Expired_Points,
                            Used_Points: used_points,
                            Total_Points: active_points + used_points,
                            Status: 'Bronze',
                        });
                    } else if (
                        active_points + used_points > 500 &&
                        active_points + used_points < 1000
                    ) {
                        await User_Card.update({
                            Active_Points: active_points,
                            Expired_Points: User_Card.Expired_Points,
                            Used_Points: used_points,
                            Total_Points: active_points + used_points,
                            Status: 'Silver',
                        });
                    } else if (active_points + used_points >= 1000) {
                        await User_Card.update({
                            Active_Points: active_points,
                            Expired_Points: User_Card.Expired_Points,
                            Used_Points: used_points,
                            Total_Points: active_points + used_points,
                            Status: 'Gold',
                        });
                    }
                    await voucher.update({
                        voucher_used: (voucher.voucher_used += 1),
                    });
                    await Redeemcount.update({
                        Redeemcount: Redeemcount.Redeemcount + 1,
                    });
                    if (voucher.voucher_used >= voucher.total_voucher) {
                        await voucher.update({
                            voucher_status: 'Inactive',
                        });
                    }
                    await item.save();
                    req.flash(
                        'success',
                        'Successfully redeemed ',
                        voucher.voucher_title,
                        '( - ',
                        req.body.redeem,
                        ' )'
                    );
                    return res.redirect('/account/loyaltyprogram');
                }
            }
        } else {
            req.flash('error', 'please login as customer first to redeem');
            return res.redirect('/login');
        }
    } catch (e) {
        console.log(e);
    }
});

loyaltyprogram.post('/redeemables/:id', async (req, res) => {
    try {
        // const [item, created] = await RedeemableVoucher.findOrCreate({
        //     where: {
        //         VoucherId: req.params.id,
        //     },
        //     defaults: {
        //         Price:req.body.reward_price
        //     }
        // })

        let voucher_id = req.params.id;
        console.log(voucher_id);
        let price = req.body.reward_price;
        const voucher = await Voucher.findOne({
            where: { id: voucher_id },
        });
        console.log(voucher.id);
        const redeem = await Redeemables.findOne({
            where: { VoucherId: voucher.id },
        });

        if (redeem != undefined) {
            req.flash('error', 'Reward has already been added');
            return res.redirect('/staff/manage-vouchers');
        } else {
            Redeemables.create({
                VoucherId: voucher.id,
                Price: price,
                Redeemcount: 0,
            });
            req.flash(
                'success',
                'Sucessfully added Reward' + voucher.voucher_title
            );
            return res.redirect('/staff/manage-vouchers');
        }

        //  await item.save()
    } catch (e) {
        console.log(e);
    }
});

module.exports = loyaltyprogram;
