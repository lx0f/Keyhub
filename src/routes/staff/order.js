const express = require('express');
const router = express.Router();
const {
  Order,
  OrderItem,
  Product,
  Address,
  User,
  Delivery,
} = require('../../models');

/*
Use cases:
  view orders
  force cancel order
*/

router.route('/').get(async (req, res) => {
  const orders = await Order.findAll({ include: User });
  return res.render('staff/order/table', { orders });
});
router
  .route('/:id')
  .get(async (req, res) => {
    const { id: orderId } = req.params;
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          model: Address,
        },
      ],
    });
    const orderItems = await OrderItem.findAndCountAll({
      where: {
        OrderId: orderId,
      },
      include: Product,
    });
    const stat = {
      productCount: orderItems.count,
      revenue: order.OrderItems.reduce((p, c) => {
        return p + c.quantity * c.Product.price;
      }, 0),
    };
    const delivery = await Delivery.findOne({
      where: {
        OrderId: order.id,
      },
    });
    return res.render('staff/order/view', { order, stat, delivery });
  })
  .put(async (req, res) => {
    const { id: orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByPk(orderId);
    const delivery = await Delivery.create({
      OrderId: orderId,
      AddressId: order.AddressId,
    });
    await order.update({ status });
    req.flash('success', 'Delivery started!');
    return res.redirect('back');
  });
module.exports = router;
