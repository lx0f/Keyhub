const { Model, DataTypes } = require('sequelize');
const sequelize = require('../data');
const { Order } = require('./Order');

class Voucher extends Model {}
Voucher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: 'id',
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
      unique: 'code',
    },
    value: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.ENUM(['percentage', 'raw']),
    },
    start: {
      type: DataTypes.DATE,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
  }
);

class UsedVoucher extends Model {}
UsedVoucher.init({}, { sequelize });

Voucher.hasMany(UsedVoucher);
UsedVoucher.belongsTo(Voucher);

Order.hasOne(UsedVoucher);
UsedVoucher.belongsTo(Order);

module.exports = { Voucher, UsedVoucher };
