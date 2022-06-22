const Sequelize = require('sequelize');
const sequelize = require('./database_setup');
const Product =  require("./product");
const CartItem =  require("./cart_item");

const Cart = sequelize.define('Cart', {
    UserId: {
        type: Sequelize.INTEGER
    }
},{});

// define association here
Cart.belongsToMany(Product, {
    through: {
        CartItem
        },
    foreignKey: 'CartId',
    as: 'cartProducts'
})

module.exports = Cart;