const express = require('express');
const FAQrouter = express.Router();
const FAQs = require('../models/FAQs');
const moment = require('moment');
const url = require('url');
const { Usertraffic, Individualtraffic } = require("../models/Usertraffic");
FAQrouter.route('/').get(async (req, res) => {
    if (req.user) {
        var pathUrl = req.originalUrl
        const find_traffic = await Usertraffic.findOne({ where: { path: pathUrl } })
        var now = moment().format('YYYY-MM-DD HH:mm:ss');

        if (find_traffic) {
            const indviudal_traffic = await Individualtraffic.findOne({ where: { path: find_traffic.path, UserId: req.user.id } })
            if (indviudal_traffic) {
                var latestvisit = moment(indviudal_traffic.latestvisit).format('YYYY-MM-DD HH:mm:ss');
                var minute = moment(now).diff(moment(latestvisit), 'minutes');
                console.log(minute);
                if (minute >= 3) {
            
                    find_traffic.update({ pathcount: find_traffic.pathcount + 1 })
                    indviudal_traffic.update({ latestvisit: now, visitcount: indviudal_traffic.visitcount + 1 })
                }
            } else {
                find_traffic.update({ pathcount: find_traffic.pathcount + 1, usercount: find_traffic.usercount + 1 })
                await Individualtraffic.create({ UserId: req.user.id, path: find_traffic.path, visitcount: 1, latestvisit: now })
            }
    
        } else {
            await Usertraffic.create({ UserId: req.user.id, path: pathUrl, pathcount: 1, usercount: 1 })
            const new_traffic = await Usertraffic.findOne({ where: { path: pathUrl } })

            await Individualtraffic.create({ UserId: req.user.id, path: new_traffic.path, visitcount: 1, latestvisit: now })
        }
    }
    const faqs = await (await FAQs.findAll()).map((x) => x.dataValues);
    return res.render('./customers/page-faqs', { faqs });
});

module.exports = FAQrouter;
