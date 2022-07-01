// const express = require('express')
// const router = express.Router()

// const orderController = require('../../controllers/orderController')

// router.get('/', orderController.getOrders)
// router.get('/data', orderController.fillOrderData)
// router.post('/data', orderController.postOrder)
// router.post('/newebpay/callback', orderController.newebpayCallback)
// router.get('/:id', orderController.getOrder)
// router.post('/:id/cancel', orderController.cancelOrder)

// module.exports = router
const express = require("express")
const CustomerOrder = express.Router()
const { Order }  = require("../models/order")
const {OrderItem} = require("../models/order")
const Product = require("../models/product")
const {Payment} = require("../models/order")
const {Cart} = require("../models/cart")

// Get Orders
// CustomerOrder.get('/', async (req, res) => {
//     try {
//         const ordersHavingProducts = await Order.findAll({
//           raw: true,
//           nest: true,
//           where: { UserId: req.user.id },
//           include: 'orderProducts'
//         })
//         const orders = await Order.findAll({
//           raw: true,
//           nest: true,
//           where: { UserId: req.user.id }
//         })
//         orders.forEach(order => {
//           order.orderProducts = []
//         })
//         ordersHavingProducts.forEach(product => {
//           const index = orders.findIndex(order => order.id === product.id)
//           if (index === -1) return
//           orders[index].orderProducts.push(product.orderProducts)
//         })
//         return res.render('orders', { orders })
//       } catch (e) {
//         console.log(e)
//       }
// });

// fillOrderData
CustomerOrder.get('/data', async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { UserId: req.user.id },
      include: 'cartProducts'
    })
    if (!cart || !cart.cartProducts.length) {
      req.flash('error', 'Your shopping cart is empty!')
      return res.redirect('/cart')
    }
    const cartId = cart.id
    const amount = cart.cartProducts.length > 0 ? cart.cartProducts.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
    return res.render('orderData', { cartId, amount })
  } catch (e) {
    console.log(e)
  }
});

// Post Order
CustomerOrder.post('/data', async (req, res) => {
    try {
        // check all products have inventory
        const cart = await Cart.findByPk(req.body.cartId, {
          include: 'cartProducts'
        })
        console.log(cart.cartProducts)
        for (const product of cart.cartProducts) {
          if (product.stock < product.CartItem.quantity) {
            req.flash('error', `Product Id:${product.id} only left with ${product.stock}, Please reselect quantity!`)
            return res.redirect('/cart')
          }
        }
        // update inventory data
        const productsMap = new Map()
        cart.cartProducts.forEach(product => {
          productsMap.set(product.id, product.CartItem.quantity)
        })
        for (const [id, quantity] of productsMap) {
          const product = await Product.findByPk(id)
          await product.update({
            stock: product.stock -= quantity
          })
        }
        // create order (cart -> order)
        const order = await Order.create({
          UserId: req.user.id,
          name: req.body.name,
          // address: req.body.address,
          // phone: req.body.phone,
          // amount: req.body.amount,
          // shipping_status: req.body.shipping_status,
          // payment_status: req.body.payment_status
          address: req.body.address,
          phone: req.body.phone,
          amount: req.body.amount,
          shipping_status: req.body.shipping_status,
          payment_status: req.body.payment_status
        })
        // create orderItem (cartItem -> orderItem)
        const items = Array.from({ length: cart.cartProducts.length }).map((_, i) => (
          OrderItem.create({
            OrderId: order.id,
            ProductId: cart.cartProducts[i].id,
            price: cart.cartProducts[i].price,
            quantity: cart.cartProducts[i].CartItem.quantity
          })
        ))
        Promise.all(items)
        // send mail
        // const email = req.user.email
        // const subject = `[TEST] Keyhub Order with Order ID:${order.id} created, Please take time to pay`
        // const status = 'Unshipped / Unpaid'
        // const msg = 'Please click the payment link and pay with a test credit card! Thanks for your cooperation!'
        // sendMail(email, subject, orderMail(order, status, msg))
        // clear cart & cartItem
        await cart.destroy()
        // clear cartId in session
        req.session.cartId = ''
        return res.redirect('/cart')
    } catch (e) {
    console.log(e)
    }
});

// cancelOrder
CustomerOrder.post('/:id/cancel', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id)
        await order.update({
          shipping_status: '-1'
        })
        req.flash('error', `OrderId${order.id} cancelled!`)
        return res.status(200).redirect('back')
    } catch (e) {
      console.log(e)
    }
});

// PaymentCallback
CustomerOrder.post('/newebpay/callback', async (req, res) => {
    try {
        const data = JSON.parse(decryptData(req.body.TradeInfo))
        console.log('***data***', data)
        // find order
        const order = await Order.findOne({ where: { sn: data.Result.MerchantOrderNo } })
        // create payment data
        await Payment.create({
          OrderId: order.id,
          payment_method: data.Result.PaymentMethod ? data.Result.PaymentMethod : data.Result.PaymentType,
          isSuccess: data.Status === 'SUCCESS' ? true : false,
          failure_message: data.Message,
          payTime: data.Result.PayTime
        })
        // flash msg
        if (data.Status === 'SUCCESS') {
          // update payment_status
          await order.update({ payment_status: 1 })
          // send mail
          const email = req.user.email
          const subject = `[TEST]Key Hub OrderID:${order.id} Payment Done!`
          const status = 'Unshipped / Unpaid'
          const msg = 'Shipment will be arranged in the near future, please pay attention to the email again!'
          sendMail(email, subject, payMail(order, status, msg))
          // flash message
          req.flash('success', `OrderID:${order.id} Payment Done!`)
        } else {
          req.flash('error', `OrderID:${order.id} Payment fail!  [info] ${data.Message}`)
        }
        return res.status(200).redirect(`/order/${order.id}`)
    } catch (e) {
    console.log(e)
    }
});

module.exports = CustomerOrder