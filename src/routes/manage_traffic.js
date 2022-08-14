const express = require('express');
const User = require('../models/User');
const { Usertraffic, Individualtraffic } = require("../models/Usertraffic");
const cron = require('node-cron');
const moment = require('moment');
const url = require('url');
require('dotenv').config();
const manageusertraffic = express.Router();

manageusertraffic.route('/').get(async (req, res) => {
    try {
        const Alltraffic = await Usertraffic.findAll()
        const Personal_traffic = await Individualtraffic.findAll()
        const Users = await User.findAll()

        res.render('./staff/traffic/traffic-table', {Alltraffic,Personal_traffic,Users})
    } catch (e) {
        console.log(e);
    }

});

module.exports = manageusertraffic;