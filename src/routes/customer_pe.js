const express = require('express');
const Pevaluation = require('../models/product_evaluation');
const PevaluationRouter = express.Router();
const Product = require('../models/product');
const fs = require('fs');
const { Order } = require('../models/order');
const moment = require('moment');
const url = require('url');
const { Usertraffic, Individualtraffic } = require("../models/Usertraffic");
const upload = require('../configuration/imageUpload');

PevaluationRouter.get('/:id', async (req, res) => {
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
        }
        const product = await Product.findByPk(req.params.id);
        const ProductId = req.params.id;
        // console.log(ProductId);
        const pe = await Pevaluation.findOne({
            where: { ProductId: req.params.id, UserId: req.user.id },
        });
        if (pe) {
            req.flash('info', 'You have rated on this product');
            res.redirect('/account/orderhistory');
        } else {
            res.render('./customers/page-product-evaluation', {
                ProductId,
                product,
            });
        }
    } catch (e) {
        console.log(e);
    }
});

// PevaluationRouter.post('/:id', async function (req, res) {
//     upload(req, res, async (err) => {

//         if(err || !req.file) {
//             req.flash("error", "Please upload a proper file!")
//             console.log(err)
//             return res.redirect("/CreatePE")

//         }
//          else {
//             Pevaluation.create({
//                 ProductId: req.params.id,
//                 UserId: req.user.id,
//                 ProductRating: req.body.ProductRating,
//                 ProductRemarks: req.body.ProductRemarks,
//                 imageFilePath1: `uploads/${req.file.filename}`
//             })
//             req.flash("success","Your Product evaluation sent susscessfully, Thank you")
//             res.redirect("/")

//           }
//       });
//     });

PevaluationRouter.post('/:id', async function (req, res) {
    //     const imageAsBase64 = "data:image/png;base64, " + fs.readFileSync(`public/${req.user.imageFilePath}`, 'base64');
    //     res.render("./customers/page-profile-edit", {imageAsBase64})
    // }).post(async (req, res) => {

    upload(req, res, async (err) => {
        var fileName = null;
        try {
            fileName = req.file.filename;
        } catch (error) {}

        Pevaluation.create({
            ProductId: req.params.id,
            UserId: req.user.id,
            ProductRating: req.body.ProductRating,
            ProductRemarks: req.body.ProductRemarks,
            imageFilePath1: fileName ? `uploads/${req.file.filename}` : null,
        });
        req.flash(
            'success',
            'Your Product evaluation sent successfully, Thank you'
        );
        res.redirect('/');
    });
});

module.exports = PevaluationRouter;
