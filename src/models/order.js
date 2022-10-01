const sequelize = require('../data');
const { Model, DataTypes } = require('sequelize');
const { Product } = require('./Product');
const { User, Address, PaymentMethod } = require('./User');

class Order extends Model {}
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total: {
      type: DataTypes.INTEGER,
    },
    count: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM(['waiting', 'delivering', 'done']),
      defaultValue: 'waiting',
    },
  },
  { sequelize }
);

class OrderItem extends Model {}
OrderItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize }
);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Address.hasMany(Order);
Order.belongsTo(Address);

PaymentMethod.hasMany(Order);
Order.belongsTo(PaymentMethod);

User.hasMany(Order);
Order.belongsTo(User);

module.exports = { Order, OrderItem };
