const Sequelize = require("sequelize");
const sequelize = require("./database_setup");
const User = require("./User");
const Voucher = require("./Voucher");

class VoucherBag extends Sequelize.Model {}

VoucherBag.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        UserId: {
            type: Sequelize.DataTypes.INTEGER
        },
        VoucherId:{
            type: Sequelize.DataTypes.INTEGER
        },
        // name: {
        //     type: Sequelize.DataTypes.STRING
        // },
        // phone: {
        //     type: Sequelize.DataTypes.STRING
        // },
        // sn: {
        //     type: Sequelize.DataTypes.STRING
        // },
        // amount: {
        //     type: Sequelize.DataTypes.INTEGER
        // },
        // shipping_status: {
        //     type: Sequelize.DataTypes.STRING
        // },
        // payment_status: {
        //     type: Sequelize.DataTypes.STRING
        // }
    },
    {
        freezeTableName: true,
        timestamps: true,
        sequelize,
        modelName: "VoucherBag",
    }
);

class VoucherBagItem extends Sequelize.Model {}
VoucherBagItem.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
     
    },
    {
        freezeTableName: true,
        timestamps: true,
        sequelize,
        modelName: "VoucherBagItem",
    }
);


// User and order association 
VoucherBag.belongsTo(User);
User.hasOne(VoucherBag);

// Order and Product association
VoucherBag.belongsToMany(Voucher, {
    through: {
      model: OrderItem,
      unique: false
    },
    foreignKey: 'OrderId',
    as: 'orderProducts'
})
Product.belongsToMany(Order, {
    through: {
        model: OrderItem,
        unique: false
    },
    foreignKey: 'ProductId',
    as: 'orders'
})

module.exports = { Order, OrderItem};
