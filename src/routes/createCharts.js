const dataRouter = require('express').Router();
const dfd = require('danfojs-node');
const User = require('../models/user');
const chartJsImg = require('chartjs-to-image');
const Chart = require("./pipeline");
const { lineUserChartDaily } = require('./pipeline');

class GenerateImageCharts {
    constructor(to, from) {
        this.to = to;
        this.from = from
    }

    async generateLineUserChartDaily() {
        const df2 = await Chart.lineUserChartDaily(this.to, this.from)

        var NoOfUsers = [];
        var dates = [];
        df2.forEach((element) => {
            NoOfUsers.push(element['NoOfUsersJoined_sum']);
            dates.push(element['Dates']);
        });
        console.log(dates);
    
        console.log(NoOfUsers);
        console.log(df2)
        console.log("osdjsfjojfoifiosdff")
        console.log("osdjsfjojfoifiosdff")
        console.log("osdjsfjojfoifiosdff")
        console.log("osdjsfjojfoifiosdff")
        console.log("osdjsfjojfoifiosdff")
        
    
    
        const myChart = new chartJsImg();
    
        myChart.setConfig({
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Number of Users Joined Daily',
                        lineTension: 0.3,
                        backgroundColor: 'rgba(78, 115, 223, 0.05)',
                        borderColor: 'rgba(78, 115, 223, 1)',
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                        pointBorderColor: 'rgba(78, 115, 223, 1)',
                        pointHoverRadius: 3,
                        pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
                        pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
                        pointHitRadius: 10,
                        pointBorderWidth: 2,
                        data: NoOfUsers,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0,
                    },
                },
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'date',
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false,
                            },
                            ticks: {
                                maxTicksLimit: 7,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                maxTicksLimit: 5,
                                padding: 10,
                                // Include a dollar sign in the ticks
                            },
                            gridLines: {
                                color: 'rgb(234, 236, 244)',
                                zeroLineColor: 'rgb(234, 236, 244)',
                                drawBorder: false,
                                borderDash: [2],
                                zeroLineBorderDash: [2],
                            },
                        },
                    ],
                },
            },
        });
        await myChart.toFile(`dailyLineChart.png`);

        return `dailyLineChart.png`
    }

    async GenerateLineUserChartYearly() {
        const df2 = await Chart.lineUserChartYearly(this.to, this.from)
    var NoOfUsers = [];
    var dates = [];
    df2.forEach((element) => {
        NoOfUsers.push(element['NoOfUsersJoined_sum']);
        dates.push(element['Dates']);
    });
    console.log(dates);
    console.log(NoOfUsers);
    console.log(df2)


    const myChart = new chartJsImg();

    myChart.setConfig({
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Number of Users Joined Yearly',
                    lineTension: 0.3,
                    backgroundColor: 'rgba(78, 115, 223, 0.05)',
                    borderColor: 'rgba(78, 115, 223, 1)',
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                    pointBorderColor: 'rgba(78, 115, 223, 1)',
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
                    pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                    data: NoOfUsers,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0,
                },
            },
            scales: {
                xAxes: [
                    {
                        time: {
                            unit: 'date',
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            maxTicksLimit: 7,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            maxTicksLimit: 5,
                            padding: 10,
                            // Include a dollar sign in the ticks
                        },
                        gridLines: {
                            color: 'rgb(234, 236, 244)',
                            zeroLineColor: 'rgb(234, 236, 244)',
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2],
                        },
                    },
                ],
            },
        },
    });
    await myChart.toFile(`yearlyLineChart.png`);
    return `yearlyLineChart.png`
    }




    async GenerateLineUserChartMonthly() {
        const df2 = await Chart.lineUserChartMonthly(this.to, this.from)
        var NoOfUsers = [];
        var dates = [];
        df2.forEach((element) => {
            NoOfUsers.push(element['NoOfUsersJoined_sum']);
            dates.push(element['Dates']);
        });
        console.log(dates);
        console.log(NoOfUsers);
    
        console.log('hoi');
        console.log(df2);
        console.log('a');
        console.log('a');
        console.log('a');
        console.log('a');
        console.log('a');
        console.log('a');
    
        const myChart = new chartJsImg();
    
        myChart.setConfig({
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Number of Users Joined Monthly',
                        lineTension: 0.3,
                        backgroundColor: 'rgba(78, 115, 223, 0.05)',
                        borderColor: 'rgba(78, 115, 223, 1)',
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                        pointBorderColor: 'rgba(78, 115, 223, 1)',
                        pointHoverRadius: 3,
                        pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
                        pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
                        pointHitRadius: 10,
                        pointBorderWidth: 2,
                        data: NoOfUsers,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0,
                    },
                },
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'date',
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false,
                            },
                            ticks: {
                                maxTicksLimit: 7,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                maxTicksLimit: 5,
                                padding: 10,
                                // Include a dollar sign in the ticks
                            },
                            gridLines: {
                                color: 'rgb(234, 236, 244)',
                                zeroLineColor: 'rgb(234, 236, 244)',
                                drawBorder: false,
                                borderDash: [2],
                                zeroLineBorderDash: [2],
                            },
                        },
                    ],
                },
            },
        });
        await myChart.toFile(`monthlyLineChart.png`);

        return `monthlyLineChart.png`
    

    }
}

module.exports = GenerateImageCharts