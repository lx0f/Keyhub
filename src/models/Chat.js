const sequelize = require('../data');
const { Model, DataTypes } = require('sequelize');
const { User } = require('./User');

class Room extends Model {}
Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: 'name',
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
  }
);

class Message extends Model {}
Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
  }
);

Room.belongsToMany(User, { through: Message });
User.belongsToMany(Room, { through: Message });
User.hasMany(Message);
Message.belongsTo(User);
Room.hasMany(Message);
Message.belongsTo(Room);

module.exports = { Room, Message };
