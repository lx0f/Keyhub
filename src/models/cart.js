const Sequelize = require('sequelize');
const sequelize = require('./database_setup');
const Products =  require("./product");
const CartItem =  require("./cart_item");


class Cart extends Sequelize.Model {}

Cart.init(
    {
        UserId: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
    },{
        freezeTableName: true,
        timestamps: true,
        sequelize,
        modelName: "Cart",
    }
);

// define association here
Cart.belongsToMany(Products, {
    through: {
        CartItem,
        unique: false,
        },
    foreignKey: 'CartId',
    as: 'cartProducts'
})

module.exports = Cart;