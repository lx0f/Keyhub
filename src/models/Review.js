const sequelize = require('../data');
const { Model, DataTypes } = require('sequelize');
const { Product } = require('./Product');
const { User } = require('./User');

class Review extends Model {}
Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize,
  }
);

Product.hasMany(Review);
Review.belongsTo(Product);
User.hasMany(Review);
Review.belongsTo(User);

module.exports = { Review };
