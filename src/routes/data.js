const dataRouter = require('express').Router();
const dfd = require('danfojs-node');
const User = require('../models/user');
const chartJsImg = require('chartjs-to-image');
const Chart = require('./pipeline');

var getDaysArray = function (s, e) {
    for (
        var a = [], d = new Date(s);
        d <= new Date(e);
        d.setDate(d.getDate() + 1)
    ) {
        a.push(new Date(d));
    }
    return a;
};

dataRouter.get('/chart-info', async (req, res) => {
    const earliest_user = (
        await User.findAll({
            limit: 1,
        })
    )[0].dataValues.date
        .split('/')
        .join('-');

    const df2 = await Chart.lineUserChartDaily(
        new Date(earliest_user),
        new Date()
    );

    var NoOfUsers = [];
    var dates = [];
    df2.forEach((element) => {
        NoOfUsers.push(element['NoOfUsersJoined_sum']);
        dates.push(element['Dates']);
    });

    const myChart = new chartJsImg();

    res.status(200).json({ data: df2 });
});

dataRouter.get('/chart-info-year', async (req, res) => {
    const earliest_user = (
        await User.findAll({
            limit: 1,
        })
    )[0].dataValues.date
        .split('/')
        .join('-');
    const df2 = await Chart.lineUserChartYearly(
        new Date(earliest_user),
        new Date()
    );
    var NoOfUsers = [];
    var dates = [];
    df2.forEach((element) => {
        NoOfUsers.push(element['NoOfUsersJoined_sum']);
        dates.push(element['Dates']);
    });

    res.status(200).json({ data: df2 });
});

dataRouter.get('/chart-info-month', async (req, res) => {
    const earliest_user = (
        await User.findAll({
            limit: 1,
        })
    )[0].dataValues.date
        .split('/')
        .join('-');
    const df2 = await Chart.lineUserChartMonthly(
        new Date(earliest_user),
        new Date()
    );
    var NoOfUsers = [];
    var dates = [];
    df2.forEach((element) => {
        NoOfUsers.push(element['NoOfUsersJoined_sum']);
        dates.push(element['Dates']);
    });

    res.status(200).json({ data: df2 });
});

dataRouter.get('/chart-info-pie', async (req, res) => {
    const a = await Chart.proportionPieChart();
    return res.status(200).json({ a });
});

module.exports = dataRouter;
