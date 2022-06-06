const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const sequelize = require("./database_setup");

class User extends Sequelize.Model {
  compareHash(value) {
    return bcrypt.compareSync(value, this.getDataValue("password"));
  }
}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: false,   
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 10) + "");
      },
    },
    isStaff: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    sequelize,
  }
);

module.exports = User;
