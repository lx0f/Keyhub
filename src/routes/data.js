const dataRouter = require('express').Router();
const dfd = require('danfojs-node');
const User = require('../models/user');
const chartJsImg = require('chartjs-to-image');
const Chart = require("./pipeline");

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

    const df2 = await Chart.lineUserChartDaily(new Date('07-07-2022'), new Date())

    var NoOfUsers = [];
    var dates = [];
    df2.forEach((element) => {
        NoOfUsers.push(element['NoOfUsersJoined_sum']);
        dates.push(element['Dates']);
    });
    console.log(dates);

    console.log(NoOfUsers);



    
    res.status(200).json({ data: df2 });
});

dataRouter.get('/chart-info-year', async (req, res) => {
    const df2 = await Chart.lineUserChartYearly(new Date("07-07-2022"), new Date())
    var NoOfUsers = [];
    var dates = [];
    df2.forEach((element) => {
        NoOfUsers.push(element['NoOfUsersJoined_sum']);
        dates.push(element['Dates']);
    });
    console.log(dates);
    console.log(NoOfUsers);
    console.log(df2)


   
    res.status(200).json({ data: df2 });
});

dataRouter.get('/chart-info-month', async (req, res) => {
    const df2 = await Chart.lineUserChartMonthly(new Date("07-07-2022"), new Date())
    var NoOfUsers = [];
    var dates = [];
    df2.forEach((element) => {
        NoOfUsers.push(element['NoOfUsersJoined_sum']);
        dates.push(element['Dates']);
    });
    console.log(dates);
    console.log(NoOfUsers);

    console.log('hoi');


    res.status(200).json({ data: df2 });
});

module.exports = dataRouter;
