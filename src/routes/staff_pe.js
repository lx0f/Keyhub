const express = require("express");
const Pevaluation = require("../models/product_evaluation")
const PevaluationRouter = express.Router()

PevaluationRouter.get('/productevaluations',async (req, res) => {
    const product_evaluation = await (await Pevaluation.findAll()).map((x) => x.dataValues);
    return res.render("./staff/productevaluation/staff-productevaluation-retrieve", { product_evaluation });
    })

PevaluationRouter.get('/deleteproductevaluation/:id', async function (req, res) {
    try {
        let pe = await Pevaluation.findByPk(req.params.id);
        if (!pe) {
            flashMessage(res, 'error', 'product evaluation not found');
            res.redirect('/staff/manage-pe/productevaluations');
            return;
        }
        let result = await Pevaluation.destroy({ where: { id: pe.id } });
        req.flash("success", "Product Evaluation with ID " + result + " is deleted!");
        res.redirect('/staff/manage-pe/productevaluations');
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = PevaluationRouter
