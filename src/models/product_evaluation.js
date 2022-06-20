const Sequelize = require('sequelize');
const db = require('./database_setup');

const Pevaluation = db.define('product evaluation',
{
    ProductName: { type: Sequelize.STRING },
    ProductCategory: { type: Sequelize.STRING },
    ProductRating: { type: Sequelize.INTEGER },
    ProductRemarks: { type: Sequelize.STRING },
});

module.exports = Pevaluation;