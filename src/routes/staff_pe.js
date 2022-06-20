const express = require("express");
const Pevaluation = require("../models/product_evaluation")
const PevaluationRouter = express.Router()

PevaluationRouter.get('/productevaluations',async (req, res) => {
    const product_evaluation = await (await Pevaluation.findAll()).map((x) => x.dataValues);
    return res.render("./staff/staff-productevaluation-retrieve", { product_evaluation });
    })

module.exports = PevaluationRouter
