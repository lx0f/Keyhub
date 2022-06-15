const express = require("express");
const db = require("../models/database_setup")
const productRouter = express.Router()
const product = require("../models/product")

productRouter.get('/', (req, res) => {
    console.log("Product Render")
    res.render('./staff/staff-productCreate');
});
productRouter.post('/', async function (req, res) {
    let { name,description, category,stock } = req.body;
    const uniqueid = await product.count()
    product.create({
        name,description,category,stock
        //list of attributes(not finished)
    })

    req.flash("success",name," has been successfully added!")
    req.flash("success",name,description,category,stock,"ID:",uniqueid)
    res.redirect("/staff/product")
    });

module.exports = productRouter