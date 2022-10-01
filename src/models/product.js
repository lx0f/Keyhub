const sequelize = require('../data');
const { Model, DataTypes } = require('sequelize');

class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.ENUM([
        'switch',
        'custom',
        'prebuilt',
        'keycap',
        'accessory',
      ]),
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  { sequelize }
);

module.exports = { Product };
