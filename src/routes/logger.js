const loggerRouter = require("express").Router()
const IPLogger = require("../models/IPLogger")
loggerRouter.route("/").post(async (req, res) => {

    if(!(await IPLogger.findOne({where: {ip: req.body.query}}))) {
    const logger = await IPLogger.create({
        country: req.body.country,
        regionName: req.body.regionName,
        lat: req.body.lat,
        lon: req.body.lon,
        ip: req.body.query,
        zip: req.body.zip
    })
    console.log(logger)
    }
})
module.exports = loggerRouter