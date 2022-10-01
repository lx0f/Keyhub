const bcrypt = require('bcrypt');
const sequelize = require('../data');
const { Model, DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');

class User extends Model {
  compareHash(value) {
    return bcrypt.compareSync(value, this.getDataValue('password'));
  }

  verifyTokenAge() {
    return moment().unix() - this.getDataValue('resetTokenDate') < 300;
  }

  generateResetToken() {
    this.setDataValue('resetTokenID', uuid());
    this.setDataValue('resetTokenDate', moment().unix());
    this.save();
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(30),
    },
    email: {
      type: DataTypes.STRING,
      unique: 'email',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        if (value) {
          this.setDataValue('password', bcrypt.hashSync(value, 10) + '');
        }
      },
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    authMethod: {
      type: DataTypes.ENUM(['local', 'oauth', 'both']),
      defaultValue: 'local',
      allowNull: false,
    },
    resetTokenID: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },
    resetTokenDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isStaff: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
  }
);

class Address extends Model {}
Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: 'id',
    },
    country: {
      type: DataTypes.STRING,
    },
    zipCode: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    unitNumber: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
  }
);

class PaymentMethod extends Model {}
PaymentMethod.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: 'id',
      allowNull: false,
    },
    holderName: {
      type: DataTypes.STRING,
    },
    cardNumber: {
      type: DataTypes.STRING,
    },
    expiryDate: {
      type: DataTypes.STRING,
    },
    cvv: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
  }
);

User.hasMany(Address);
Address.belongsTo(User);
User.hasMany(PaymentMethod);
PaymentMethod.belongsTo(User);

module.exports = { User, Address, PaymentMethod };
