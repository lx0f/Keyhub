const Sequelize = require("sequelize");
const db = require("./database_setup");
const Cart = require("./cart");
const CartItem = require("./cart_item");
const Order = require("./order");
const OrderItem = require("./order_item");

const Products = db.define("products", {
    productID: { type: Sequelize.INTEGER },
    description: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },
    brand: { type: Sequelize.STRING }, //not done
    category: { type: Sequelize.STRING }, //get from dropdown, locked choices
    //images
    stock: { type: Sequelize.INTEGER },
    price: { type: Sequelize.FLOAT(2) },
});

Products.belongsToMany(Cart, {
    through: {
      CartItem,
      unique: false,
    },
    foreignKey: 'ProductId',
    as: 'carts'
  })

Products.belongsToMany(Order, {
    through: {
        OrderItem,
        unique: false,
    },
    foreignKey: 'ProductId',
    as: 'orders'
})

module.exports = Products;
