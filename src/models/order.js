const Sequelize = require('sequelize');
const sequelize = require('./database_setup');
const User = require("./User");
const Payment = require("./payment");
const Products = require('./product');
const OrderItem = require('./order_item');

class Order extends Sequelize.Model {}

Order.init(
    {
        UserId: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.DataTypes.STRING,
        },
        phone: {
            type: Sequelize.DataTypes.STRING,
        },
        address: {
            type: Sequelize.DataTypes.STRING,
        },
        sn:{
            type: Sequelize.DataTypes.STRING,
        },
        amount:{
            type: Sequelize.DataTypes.INTEGER,
        },
        shipping_status:{
            type: Sequelize.DataTypes.STRING,
        },
        payment_status:{
            type: Sequelize.DataTypes.STRING,
        }
    },{
        freezeTableName: true,
        timestamps: true,
        sequelize,
        modelName: "Order",
    }
);

Order.belongsTo(User);
Order.hasMany(Payment);
Order.belongsTo(Products,{
        through: {
            OrderItem,
            unique: false,
        },
        foreignKey: 'OrderId',
        as: 'orderProducts'
    })
module.exports = Order;