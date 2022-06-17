
const Sequelize = require("sequelize");
const sequelize = require("./database_setup");



class Voucher extends Sequelize.Model {}

Voucher.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    coupon_id: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    coupon_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    coupon_value: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    coupon_status: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: false,
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
    modelName: "Voucher"
  }
);



module.exports = Voucher;
