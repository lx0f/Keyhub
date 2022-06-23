const Sequelize = require("sequelize");
const sequelize = require("./database_setup");
const Cart = require("./cart");
const CartItem = require("./cart_item");
const Order = require("./order");
const OrderItem = require("./order_item");

// const Products = db.define("products", {
//     productID: { type: Sequelize.INTEGER },
//     description: { type: Sequelize.STRING },
//     name: { type: Sequelize.STRING },
//     brand: { type: Sequelize.STRING }, //not done
//     category: { type: Sequelize.STRING }, //get from dropdown, locked choices
//     //images
//     stock: { type: Sequelize.INTEGER },
//     price: { type: Sequelize.FLOAT(2) },
// });

class Products extends Sequelize.Model {}

Products.init(
    {   
        name:{
            type: Sequelize.DataTypes.STRING,
        },
        description:{
            type: Sequelize.DataTypes.TEXT,
        },
        brand:{
            type: Sequelize.DataTypes.STRING,
        },
        category:{
            type: Sequelize.DataTypes.STRING,
        },
        stock: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: Sequelize.DataTypes.INTEGER,
        }
    },{
        freezeTableName: true,
        timestamps: true,
        sequelize,
        modelName: "Products",
    }
);
Products.belongsToMany(Cart, {
    through: {
      CartItem,
      unique: false,
    },
    foreignKey: 'ProductsId',
    as: 'carts'
  })

Products.belongsToMany(Order, {
    through: {
        OrderItem,
        unique: false,
    },
    foreignKey: 'ProductsId',
    as: 'orders'
})

module.exports = Products;
