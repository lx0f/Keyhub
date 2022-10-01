const sequelize = require('../data');
const { Model, DataTypes } = require('sequelize');
const { Product } = require('./Product');
const { User } = require('./User');

class Cart extends Model {}
Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
  }
);

class CartItem extends Model {}
CartItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  { sequelize }
);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);
Product.hasMany(CartItem);
CartItem.belongsTo(Product);

module.exports = { Cart, CartItem };
