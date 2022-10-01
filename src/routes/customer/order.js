const express = require('express');
const {
  Address,
  PaymentMethod,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Product,
} = require('../../models');
const router = express.Router();

router.use((req, res, next) => {
  if (req.isUnauthenticated()) {
    req.flash('error', 'Login first!');
    return res.redirect('/login');
  }
  next();
});

/*
Use cases:
  make order
  cancel order (under certain conditions)
  view past orders
*/

router
  .route('/')
  .get(async (req, res) => {
    const { id: userId } = req.user;
    const addresses = await Address.findAll({ where: { UserId: userId } });
    const paymentMethods = await PaymentMethod.findAll({
      where: { UserId: userId },
    });
    return res.render('customer/order', { addresses, paymentMethods });
  })
  .post(async (req, res) => {
    const { id: userId } = req.user;
    const { addressId, paymentMethodId } = req.body;
    const cart = await Cart.findOne({ where: { UserId: userId } });
    const cartItems = await CartItem.findAll({
      where: { CartId: cart.id },
      include: Product,
    });
    const total = cartItems.reduce((p, c) => {
      return p + c.quantity * c.Product.price;
    }, 0);
    const count = cartItems.length;
    const order = await Order.create({
      AddressId: addressId,
      PaymentMethodId: paymentMethodId,
      UserId: userId,
      count,
      total,
    });
    cartItems.forEach(async (cartItem) => {
      await OrderItem.create({
        OrderId: order.id,
        ProductId: cartItem.ProductId,
        quantity: cartItem.quantity,
      });
      await cartItem.destroy();
    });

    req.flash('success', 'Order made!');
    return res.redirect('/cart');
  });

module.exports = router;
