const Sequelize = require('sequelize');
const sequelize = require('./database_setup');
const Order = require('./order')

const Payment = sequelize.define('Payment', {
    OrderId: {
        type: Sequelize.INTEGER
    },
    Payment_method:{
        type: Sequelize.STRING
    },
    isSuccess: Sequelize.BOOLEAN,
    failure_message: Sequelize.TEXT,
    payTime: Sequelize.DATE
});
Payment.belongsTo(Order)

module.exports = Payment;