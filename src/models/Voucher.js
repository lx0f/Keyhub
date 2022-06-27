
const Sequelize = require("sequelize");
const sequelize = require("./database_setup");



class Voucher extends Sequelize.Model {
  // compareStatus(value) {
  //   if(value)
  //   return 
  // }
}

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
      allowNull: true,
      unique: true,
    },
    coupon_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    coupon_value: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    coupon_status: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      unique: false,
      // set(value) {
      //   this.setDataValue("password", bcrypt.hashSync(value, 10) + "");
      // }
    },
    coupon_qty: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    coupon_desc: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    start: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      unique: false,
    },
    end: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      unique: false,
    },
     coupon_type: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
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
