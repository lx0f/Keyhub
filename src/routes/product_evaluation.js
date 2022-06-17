const express = require("express");
const db = require("../models/database_setup")
const Pevaluation = require("../models/product_evaluation")
const PevaluationRouter = express.Router()



PevaluationRouter.get('/', (req, res) => {
    res.render('./customer/page-product-evaluation');
});

PevaluationRouter.post('/', async function (req, res) {
    let { ProductName, ProductRating, ProductRemarks} = req.body;

    Pevaluation.create({
        ProductName,ProductRating,ProductRemarks
    })
    req.flash("success","Your Product evaluation sent susscessfully, Thank you")
    res.redirect("./customer/page-product-evaluation")
    });

Pevaluation.get('/productevaluations',async (req, res) => {
    const product_evaluation = await (await Pevaluation.findAll()).map((x) => x.dataValues);
    return res.render("", { product_evaluation });
    })
