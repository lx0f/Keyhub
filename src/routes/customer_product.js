const express = require('express');
const { NONE } = require('sequelize');
const { OrderItem } = require('../models/order');
const productRouter = express.Router();
const product = require('../models/product');
const Pevaluation = require('../models/product_evaluation');
const User = require('../models/User');
const moment = require('moment');
const url = require('url');
const { Usertraffic, Individualtraffic } = require("../models/Usertraffic");
// productRouter.post('/desc', async function (req, res) {
//     let { productID } = req.body;
//     const products = await (await product.findAll()).map((x) => x.dataValues);
//     const single = await Products.findOne({ where: { id: productID } });
//     return res.render('./customers/description', { single });
// });

productRouter.post('/search', async function (req, res) {
    let { search } = req.body;
    const products = await (
        await product.findAll({ where: { status: 'online' } })
    ).map((x) => x.dataValues);
    const display = [];

    for (let index = 0; index < products.length; index++) {
        // if (products[index]["name"]==search){
        //     display.push(products[index])
        // }
        var match = true;
        for (let letter = 0; letter < search.length; letter++) {
            if (
                products[index]['name'][letter].toUpperCase() ==
                search[letter].toUpperCase()
            ) {
                match = true;
            } else {
                match = false;
                break;
            }
        }
        if (match == true) {
            display.push(products[index]);
        }
    }
    const items = await display.length;
    return res.render('./customers/page-listing-grid', {
        display,
        items,
        search,
    });
});

productRouter.route('/general').get(async (req, res) => {
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
    const products = await (
        await product.findAll({ where: { status: 'online' } })
    ).map((x) => x.dataValues);

    const display = products;
    var items = await display.length;
    if (items == 1) {
        items = items.toString() + ' product';
    } else {
        items = items.toString() + ' products';
    }
    const search = null;

    //var image
    return res.render('./customers/page-listing-grid', {
        display,
        items,
        search,
    });
});

productRouter.get('/pre', async (req, res) => {
    const products = await (
        await product.findAll({ where: { status: 'online' } })
    ).map((x) => x.dataValues);
    const display = [];
    for (let index = 0; index < products.length; index++) {
        if (products[index]['category'] == 'Pre-Built Keyboard') {
            display.push(products[index]);
        }
    }

    var items = await display.length;
    if (items == 1) {
        items = items.toString() + ' product';
    } else {
        items = items.toString() + ' products';
    }
    const keeb = { keyboard: true };
    res.render('./customers/page-listing-grid', { display, items, keeb });
});

productRouter.get('/bare', async (req, res) => {
    const products = await (
        await product.findAll({ where: { status: 'online' } })
    ).map((x) => x.dataValues);
    const display = [];
    for (let index = 0; index < products.length; index++) {
        if (products[index]['category'] == 'Barebone Kit') {
            display.push(products[index]);
        }
    }
    var items = await display.length;
    if (items == 1) {
        items = items.toString() + ' product';
    } else {
        items = items.toString() + ' products';
    }
    const keyboard = true;
    res.render('./customers/page-listing-grid', { display, items, keyboard });
});

productRouter.get('/switches', async (req, res) => {
    const products = await (
        await product.findAll({ where: { status: 'online' } })
    ).map((x) => x.dataValues);
    const display = [];
    for (let index = 0; index < products.length; index++) {
        if (products[index]['category'] == 'Switches') {
            display.push(products[index]);
        }
    }

    var items = await display.length;
    if (items == 1) {
        items = items.toString() + ' product';
    } else {
        items = items.toString() + ' products';
    }
    res.render('./customers/page-listing-grid', { display, items });
});

productRouter.get('/keycaps', async (req, res) => {
    const products = await (
        await product.findAll({ where: { status: 'online' } })
    ).map((x) => x.dataValues);
    const display = [];
    for (let index = 0; index < products.length; index++) {
        if (products[index]['category'] == 'Key Cap') {
            display.push(products[index]);
        }
    }

    var items = await display.length;
    if (items == 1) {
        items = items.toString() + ' product';
    } else {
        items = items.toString() + ' products';
    }
    res.render('./customers/page-listing-grid', { display, items });
});

productRouter.get('/others', async (req, res) => {
    const products = await (
        await product.findAll({ where: { status: 'online' } })
    ).map((x) => x.dataValues);
    const display = [];
    for (let index = 0; index < products.length; index++) {
        if (products[index]['category'] == 'Accessories') {
            display.push(products[index]);
        }
    }
    var items = await display.length;
    if (items == 1) {
        items = items.toString() + ' product';
    } else {
        items = items.toString() + ' products';
    }
    res.render('./customers/page-listing-grid', { display, items });
});

productRouter.get('/detail/:id', async (req, res) => {
    try {
        const productdetail = await product.findByPk(req.params.id);
        const review = await Pevaluation.findAll({
            where: { ProductId: req.params.id },
            include: User,
        });
        const fivestar = [];
        const fourstar = [];
        const threestar = [];
        const twostar = [];
        const onestar = [];
        for (let index = 0; index < review.length; index++) {
            if (review[index]['ProductRating'] == 5) {
                fivestar.push(review[index]);
            } else if (review[index]['ProductRating'] == 4) {
                fourstar.push(review[index]);
            } else if (review[index]['ProductRating'] == 3) {
                threestar.push(review[index]);
            } else if (review[index]['ProductRating'] == 2) {
                twostar.push(review[index]);
            } else if (review[index]['ProductRating'] == 1) {
                onestar.push(review[index]);
            }
        }
        const count5 = fivestar.length;
        const count4 = fourstar.length;
        const count3 = threestar.length;
        const count2 = twostar.length;
        const count1 = onestar.length;

        const count = review.length;
        const totalorder = await OrderItem.findAll({
            where: {
                ProductId: req.params.id,
            },
        });

        let average =
            (count5 * 5 + count4 * 4 + count3 * 3 + count2 * 2 + count1 * 1) /
            count;
        if (count == 0) {
            average = 0;
        }
        // console.log(average)
        // console.log(onestar)
        res.render('./customers/page-product-large', {
            productdetail,
            review,
            count,
            count1,
            count2,
            count3,
            count4,
            count5,
            average,
            totalorder,
        });
    } catch (e) {
        console.log(e);
    }
});
module.exports = productRouter;
