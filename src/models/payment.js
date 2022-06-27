const Sequelize = require('sequelize');
const sequelize = require('./database_setup');
const Order = require('./order')

class Payment extends Sequelize.Model {}

Payment.init(
    {
        OrderId: {
            type: Sequelize.INTEGER
        },
        Payment_method:{
            type: Sequelize.STRING
        },
        isSuccess: Sequelize.BOOLEAN,
        failure_message: Sequelize.TEXT,
        payTime: Sequelize.DATE
    },{
        freezeTableName: true,
        timestamps: true,
        sequelize,
        modelName: "Payment",
    }
);

// Payment.belongsTo(Order)

module.exports = Payment;