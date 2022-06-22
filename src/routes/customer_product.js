const express = require("express")
const productRouter = express.Router()
const product = require("../models/product")

productRouter.route('/general').get(async(req,res)=>{
    const items = await product.count()
    const products = await (await product.findAll()).map((x) => x.dataValues);
    return res.render("./customers/page-listing-grid",{products,items});
})

module.exports = productRouter