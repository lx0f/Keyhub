const Sequelize = require('sequelize');
const db = require('./database_setup');

const Products = db.define('products',{
    productID: {type:Sequelize.INTEGER}, 
    description: {type : Sequelize.STRING},
    name: {type: Sequelize.STRING},
    brand: {type: Sequelize.STRING}, //not done
    category: {type: Sequelize.STRING},//get from dropdown, locked choices
    //images
    stock: {type: Sequelize.INTEGER},
    price: {type: Sequelize.FLOAT(2)}
    
    });

module.exports = Products;