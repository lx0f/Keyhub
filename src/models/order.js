const Sequelize = require('sequelize');
const sequelize = require('./database_setup');
const User = require("./User");

class OrderItem extends Sequelize.Model {}

OrderItem.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.DataTypes.INTEGER,
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
        modelName: "OrderItem",
    }
);

OrderItem.belongsTo(User, { foreignKey: "authorID" });
User.hasMany(OrderItem, { foreignKey: "authorID" });

module.exports = OrderItem;