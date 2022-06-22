const Sequelize = require('sequelize');
const sequelize = require('./database_setup');

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    OrderId: {
        type: Sequelize.INTEGER
    },
    ProductId:{
        type: Sequelize.INTEGER
    },
    price: Sequelize.FLOAT,
    quantity: Sequelize.INTEGER
});
  
module.exports = OrderItem;