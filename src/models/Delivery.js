const sequelize = require('../data');
const { Model, DataTypes } = require('sequelize');
const { Order } = require('./Order');
const { Address } = require('./User');

const STAGES = ['packing', 'waiting', 'moving', 'delivered', 'received'];

class Delivery extends Model {
  async next() {
    var currentIndex = STAGES.indexOf(this.stage);
    var newIndex = currentIndex + 1;
    this.stage = STAGES[newIndex];
    await this.save();
  }

  async back() {
    var currentIndex = STAGES.indexOf(this.stage);
    if (currentIndex !== 0) {
      var newIndex = currentIndex - 1;
      this.stage = STAGES[newIndex];
      await this.save();
    }
  }
}
Delivery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stage: {
      type: DataTypes.ENUM(STAGES),
      defaultValue: 'packing',
    },
  },
  {
    sequelize,
  }
);

Order.hasOne(Delivery);
Delivery.belongsTo(Order);

Address.hasMany(Delivery);
Delivery.belongsTo(Address);

module.exports = { Delivery };
