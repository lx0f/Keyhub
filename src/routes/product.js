const express = require("express");
const db = require("../models/database_setup")
const productRouter = express.Router()
const product = require("../models/product")

productRouter.get('/', (req, res) => {
    console.log("Product Render")
    res.render('./staff/staff-productCreate');
});
productRouter.post('/', async function (req, res) {
    let { test } = req.body;
    product.create({
        //list of attributes(not finished)
    })
    const input = test
    req.flash("success",input," has been successfully added!")
    res.redirect("/staff/product")
    });

module.exports = productRouter