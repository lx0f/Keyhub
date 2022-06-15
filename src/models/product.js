const Sequelize = require('sequelize');
const db = require('./database_setup');

const Products = db.define('products',{
    productID: {type:Sequelize.INTEGER}, //still figuring out
    description: {type : Sequelize.STRING},
    name: {type: Sequelize.STRING},
    brand: {type: Sequelize.STRING},
    category: {type: Sequelize.STRING},//get from dropdown, locked choices
    //images
    stock: {type: Sequelize.INTEGER}
    //product id = number of entries need to figure out how
    });

module.exports = Products;