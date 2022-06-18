const express = require("express");
const Pevaluation = require("../models/product_evaluation")
const PevaluationRouter = express.Router()

PevaluationRouter.get('/', (req, res) => {
    res.render('./customers/page-product-evaluation');
});

PevaluationRouter.post('/', async function (req, res) {
    let { ProductName, ProductRating, ProductRemarks} = req.body;

    Pevaluation.create({
        ProductName,ProductRating,ProductRemarks
    })
    req.flash("success","Your Product evaluation sent susscessfully, Thank you")
    res.redirect("/")
    });

module.exports = PevaluationRouter
