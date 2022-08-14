const express = require('express');
const ticketRouter = express.Router();
const Ticket = require('../models/Ticket');
const moment = require('moment');
const url = require('url');
const { Usertraffic, Individualtraffic } = require("../models/Usertraffic");


ticketRouter.get('/', async (req, res) => {
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
    if (req.isUnauthenticated()) {
        req.flash('error', 'To submit a ticket, you must be logged in.');
        return res.redirect('/login');
    }
    return res.render('./customers/ticket/submit-ticket');
});

ticketRouter.post('/', async (req, res) => {
    const authorID = req.user.id;
    let { title, description, category, severity } = req.body;

    await Ticket.create({
        authorID,
        title,
        description,
        category,
        severity,
    });

    req.flash('success', 'Ticket submitted!');
    return res.redirect('/ticket');
});

module.exports = ticketRouter;
