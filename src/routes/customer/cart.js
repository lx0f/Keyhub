const express = require('express');
const router = express.Router();
const { Cart, CartItem, Product } = require('../../models');

router.use((req, res, next) => {
  if (req.isUnauthenticated()) {
    req.flash('error', 'Login first!');
    return res.redirect('/login');
  }
  next();
});

/*
Use cases:
  view cart items
  remove cart items
  edit cart item quantity
*/

router
  .route('/')
  .get(async (req, res) => {
    const { id: userId } = req.user;
    const cart = await Cart.findOne({
      where: { UserId: userId },
      include: [
        {
          model: CartItem,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });
    // calculate total price of cartitems
    const total = cart.CartItems.reduce(
      (p, c) => p + c.quantity * c.Product.price,
      0
    );
    return res.render('customer/cart', { cart, total });
  })
  .post(async (req, res) => {
    const { productId } = req.body;
    const { id: userId } = req.user;

    const cart = await Cart.findOne({ where: { UserId: userId } });
    const cartItem = await CartItem.findOne({
      where: {
        CartId: cart.id,
        ProductId: productId,
      },
    });

    if (cartItem) {
      req.flash('error', 'You already added this into your cart!');
      return res.redirect('back');
    }

    await CartItem.create({
      CartId: cart.id,
      ProductId: productId,
    });

    req.flash('success', 'Product added to cart!');
    return res.redirect('back');
  });

router
  .route('/:id/:productId')
  .post(async (req, res) => {
    const { id: cartId, productId } = req.params;
    const cartItem = await CartItem.findOne({
      where: {
        CartId: cartId,
        ProductId: productId,
      },
    });
    cartItem.quantity += 1;
    await cartItem.save();
    return res.redirect('back');
  })
  .delete(async (req, res) => {
    const { id: cartId, productId } = req.params;
    const cartItem = await CartItem.findOne({
      where: {
        CartId: cartId,
        ProductId: productId,
      },
    });
    cartItem.quantity -= 1;
    if (cartItem.quantity === 0) {
      await cartItem.destroy();
    } else {
      await cartItem.save();
    }
    return res.redirect('back');
  });

module.exports = router;
