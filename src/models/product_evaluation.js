const Sequelize = require('sequelize');
const db = require('./database_setup');

const Pevaluation = db.define('product evaluation',
{
    ProductName: { type: Sequelize.STRING },
    ProductRating: { type: Sequelize.STRING },
    ProductRemarks: { type: Sequelize.STRING },
});

module.exports = Pevaluation;