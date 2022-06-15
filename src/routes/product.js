const express = require("express");
const db = require("../models/database_setup")
const productRouter = express.Router()
const product = require("../models/product")

productRouter.get('/', (req, res) => {
    console.log("Product Render")
    res.render('./staff/staff-productCreate');
});
productRouter.post('/', async function (req, res) {
    let { name,description,category,stock,price } = req.body;
    const productID = await product.count()
    product.create({
        name,description,category,stock,price,productID
        //list of attributes(not finished)
    })

    req.flash("success",name," has been successfully added!")
    req.flash("success",name,description,category,stock,price,"ID:",productID)
    res.redirect("/staff/product")
    });
productRouter.get('/check',async (req,res)=>{
    const products =  await (await product.findAll()).map((x) => x.dataValues);
    return res.render("./staff/staff-productCheck",{ products });
});
module.exports = productRouter