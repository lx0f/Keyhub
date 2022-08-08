const express = require("express");
const Pevaluation = require("../models/product_evaluation")
const PevaluationRouter = express.Router()
const Product = require("../models/product")
const fs = require('fs');
const upload = require('../configuration/imageUpload');

PevaluationRouter.get('/:id', async (req, res) => {
    try{
        const product = await Product.findByPk(req.params.id)
        const ProductId = product.id
        console.log(ProductId)
        res.render('./customers/page-product-evaluation',{ ProductId });

    }catch(e){
        console.log(e)
    }
});

PevaluationRouter.post('/:id', async function (req, res) {
    upload(req, res, async (err) => {
       
        if(err || !req.file) {
            req.flash("error", "Please upload a proper file!")
            console.log(err)
            return res.redirect("/CreatePE")

        } 
         else {
            Pevaluation.create({
                ProductId: req.params.id,
                UserId: req.user.id,
                ProductRating: req.body.ProductRating,
                ProductRemarks: req.body.ProductRemarks,
                imageFilePath1: `uploads/${req.file.filename}`
            })
            req.flash("success","Your Product evaluation sent susscessfully, Thank you")
            res.redirect("/")
           
          }
      });
    });

module.exports = PevaluationRouter
