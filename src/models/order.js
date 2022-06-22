const Sequelize = require('sequelize');
const sequelize = require('./database_setup');
const User = require("./User");

class Orders extends Sequelize.Model {}

Orders.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            autoIncrement: false
        },
        status: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        sequelize,
        modelName: "Orders",
    }
);

Orders.belongsTo(User);

module.exports = Orders;