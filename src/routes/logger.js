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
}).get(async (req, res) => {
    let data = {}
    const result = (await IPLogger.findAll()).map((x) => x.dataValues.country)
    result.forEach(x => data[x] = (data[x] || 0) + 1)
    data = JSON.stringify(data)
    console.log(data)



    res.json({data})
})
module.exports = loggerRouter