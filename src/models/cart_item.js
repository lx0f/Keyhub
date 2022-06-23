const Sequelize = require('sequelize');
const sequelize = require('./database_setup');

const CartItem = sequelize.define('CartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    CartId: {
        type: Sequelize.INTEGER
    },
    ProductId:{
        type: Sequelize.INTEGER
    },
    quantity: Sequelize.INTEGER
});
  
module.exports = CartItem;