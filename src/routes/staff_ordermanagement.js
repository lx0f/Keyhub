const express = require("express")
const OrderManagement = express.Router()
const { Order }  = require("../models/order")
const {OrderItem} = require("../models/order")
const Product = require("../models/product")
const {Payment} = require("../models/order")
const {Cart} = require("../models/cart")

// Get Orders
OrderManagement.get('/', async (req, res) => {
    try {
        const ordersHavingProducts = await Order.findAll({
          raw: true,
          nest: true,
          include: 'orderProducts'
        })
        console.log(ordersHavingProducts)
        const orders = await Order.findAll({
          raw: true,
          nest: true,
        })

        orders.forEach(order => {
          order.orderProducts = []
        })

        ordersHavingProducts.forEach(product => {
          const index = orders.findIndex(order => order.id === product.id)
          console.log(index)
          if (index === -1) 
            return orders[index].orderProducts.push(product.orderProducts)
        })
        // const orders = await Order.findAll({
        //     include: "orderProducts"
        //   })
        
        return res.render('./staff/ordermanagement/staff-getorders', { orders })
      } catch (e) {
        console.log(e)
      }
});

module.exports = OrderManagement
