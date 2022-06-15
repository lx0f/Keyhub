const express = require("express");
const db = require("../models/database_setup")
const productRouter = express.Router()
const product = require("../models/product")

productRouter.get('/', (req, res) => {
    console.log("Product Render")
    res.render('./staff/staff-productCreate');
});

module.exports = productRouter