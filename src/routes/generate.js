const generateRouter = require('express').Router();
const { jsPDF } = require('jspdf');
const chartJsImg = require('chartjs-to-image');
const docs = new jsPDF('p', 'mm', 'a4');
const moment = require('moment');
const GenerateImageCharts = require("./createCharts")

const width = docs.internal.pageSize.getWidth();
const height = docs.internal.pageSize.getHeight();

//yyyy-mm-dd -> mm-dd-yyyy
generateRouter.route('/chart').get(async (req, res) => {
    if (req.query.from == "") {
        req.query.from = "2022-07-07"
    } 

    if(req.query.to == "") {
        req.query.to = moment().format("YYYY-MM-DD")
    }
    let from = req.query.from.split("-")[1] + "-" + req.query.from.split("-")[2] + "-" + req.query.from.split("-")[0]
   
    let to = req.query.to.split("-")[1] + "-" + req.query.to.split("-")[2] + "-" + req.query.to.split("-")[0]
    console.log(from, to)

console.log(from, to)
console.log(req.query)
    console.log(from, to)
    const generateImageCharts = new GenerateImageCharts(from, to)
    const dailyPath = await generateImageCharts.generateLineUserChartDaily()
    const monthlyPath = await generateImageCharts.GenerateLineUserChartMonthly()
    const yearlyPath = await generateImageCharts.GenerateLineUserChartYearly()
    const doc = new jsPDF();

    doc.setFont('Helvetica');
    doc.setFontSize(13);

    doc.addImage(
        'data:image/png;base64,' +
            require('fs').readFileSync('cover.png', 'base64'),
        'png',
        0,
        0,
        width,
        height
    );
    doc.text(moment().format('L'), 180, 7);
    doc.addPage();

    var imgData =
        'data:image/png;base64,' +
        require('fs').readFileSync(`${dailyPath}`, 'base64');

    doc.addImage(imgData, 'png', 15, 25, 180, 105);

    doc.addImage(
        'data:image/png;base64,' +
            require('fs').readFileSync(`${monthlyPath}`, 'base64'),
        'png',
        15,
        150,
        180,
        105
    );
    doc.addPage();
    doc.addImage(
        'data:image/png;base64,' +
            require('fs').readFileSync(`${yearlyPath}`, 'base64'),
        'png',
        15,
        10,
        180,
        105
    );
    doc.save(`KeyHubReport ${from}-${to}.pdf`);

    res.download(`KeyHubReport ${from}-${to}.pdf`);
    
});

module.exports = generateRouter;
