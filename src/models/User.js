const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const sequelize = require("./database_setup");
const moment = require("moment");
const {v4: uuid} = require("uuid");


class User extends Sequelize.Model {
  compareHash(value) {
    return bcrypt.compareSync(value, this.getDataValue("password"));
  }

  verifyTokenAge() {
    console.log(moment().unix() - this.getDataValue("resetTokenDate"))
    console.log(this.getDataValue("resetTokenDate"))
    console.log(moment().unix())
    console.log(this.getDataValue("resetTokenID"))
    return moment().unix() - this.getDataValue("resetTokenDate") < 300
  }

  generateResetToken() {
    this.setDataValue("resetTokenID", uuid());
    this.setDataValue("resetTokenDate", moment().unix());
    this.save()
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
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      unique: false,
      set(value) {
        if (value) {
          this.setDataValue("password", bcrypt.hashSync(value, 10) + "");
        }
      },
    },
    isStaff: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,

    },
    authMethod: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue: "local",
      isIn: [["local", "oauth"]],
    },
    resetTokenID: {
      //denormalisation
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },
    resetTokenDate: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0,
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
    modelName: "User",
  }
);

module.exports = User;
