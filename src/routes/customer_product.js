const express = require("express")
const productRouter = express.Router()
const product = require("../models/product")

productRouter.post("/desc",async function(req,res){
    let{productID} = req.body
    const product = await Products.findOne({where: {id: productID}})
    return res.render("./customers/description",{ product });
})

productRouter.route('/general').get(async(req,res)=>{
    const products = await (await product.findAll()).map((x) => x.dataValues);
    const display = products
    const items = await display.length
    return res.render("./customers/page-listing-grid",{display,items});
})

productRouter.get('/keyboards', async(req,res)=>{
    const products = await (await product.findAll()).map((x) => x.dataValues);
    const display = []
    for (let index = 0; index < products.length; index++) {
        if (products[index]["category"]=="keyboard"){
            display.push(products[index])
        }
        
    }
    const items = await display.length
    res.render("./customers/page-listing-grid",{display,items});
})

productRouter.get('/switches', async(req,res)=>{
    const products = await (await product.findAll()).map((x) => x.dataValues);
    const display = []
    for (let index = 0; index < products.length; index++) {
        if (products[index]["category"]=="switch"){
            display.push(products[index])
        }
        
    }
    const items = await display.length
    res.render("./customers/page-listing-grid",{display,items});
})

productRouter.get('/keycaps', async(req,res)=>{
    const products = await (await product.findAll()).map((x) => x.dataValues);
    const display = []
    for (let index = 0; index < products.length; index++) {
        if (products[index]["category"]=="keycaps"){
            display.push(products[index])
        }
        
    }
    const items = await display.length
    res.render("./customers/page-listing-grid",{display,items});
})

productRouter.get('/others', async(req,res)=>{
    const products = await (await product.findAll()).map((x) => x.dataValues);
    const display = []
    for (let index = 0; index < products.length; index++) {
        if (products[index]["category"]=="others"){
            display.push(products[index])
        }
        
    }
    const items = await display.length
    res.render("./customers/page-listing-grid",{display,items});
})
module.exports = productRouter