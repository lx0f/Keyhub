const sequelize = require('../data');
const { Model, DataTypes } = require('sequelize');
const { User } = require('./User');

class Ticket extends Model {}
Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(9000),
    },
    status: {
      type: DataTypes.ENUM(['open', 'closed']),
      defaultValue: 'open',
    },
    severity: {
      type: DataTypes.ENUM(['low', 'medium', 'high']),
    },
    category: {
      type: DataTypes.ENUM(['bug', 'product', 'request']),
    },
  },
  {
    sequelize,
  }
);

class TicketAssignee extends Model {}
TicketAssignee.init(
  {},
  {
    sequelize,
  }
);

class TicketComment extends Model {}
TicketComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(9000),
    },
    meta: {
      type: DataTypes.ENUM(['open', 'closed']),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
  }
);

// Author relationship
User.hasMany(Ticket);
Ticket.belongsTo(User);

// Assigned relationship
Ticket.belongsToMany(User, { through: TicketAssignee });
User.belongsToMany(Ticket, { through: TicketAssignee });
Ticket.hasMany(TicketAssignee);
TicketAssignee.belongsTo(Ticket);
User.hasMany(TicketAssignee);
TicketAssignee.belongsTo(User);

// Comments relationship
Ticket.hasMany(TicketComment);
TicketComment.belongsTo(Ticket);
User.hasMany(TicketComment);
TicketComment.belongsTo(User);

module.exports = { Ticket, TicketAssignee, TicketComment };
