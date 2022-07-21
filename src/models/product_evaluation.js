const Sequelize = require('sequelize');
const sequelize = require('./database_setup');
const Product = require("./product");

class Pevaluation extends Sequelize.Model {
    
  }
  
  Pevaluation.init(
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      ProductName:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      ProductCategory: {
        type:Sequelize.STRING,
        allowNull:false,
      },
      ProductRating: {
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      ProductRemarks: {
        type:Sequelize.STRING,
        allowNull:false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      sequelize,
      modelName: "Product_Evaluation"
    }
  );
  Pevaluation.belongsTo(Product);
  Product.hasMany(Pevaluation)
  module.exports = Pevaluation;