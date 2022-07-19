const express = require("express")
const OrderManagement = express.Router()
const { Order }  = require("../models/order")
const { OrderItem } = require("../models/order")
const Product = require("../models/product")
const User = require("../models/User")

// Get Orders
OrderManagement.get('/', async (req, res) => {
    const orders = await Order.findAll({
        include: [
            {
                model: OrderItem,
                include: {
                    model: Product
                }
            },
            {
                model: User
            },
        ],
    });
    console.log(orders)
    return res.render('./staff/ordermanagement/staff-getorders', { orders });
});

module.exports = OrderManagement
