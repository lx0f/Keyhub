const express = require('express');
const { OrderItem, Product, Review } = require('../../models');
const router = express.Router();

router.use((req, res, next) => {
  if (req.isUnauthenticated()) {
    req.flash('error', 'Login first!');
    return res.redirect('/login');
  }
  next();
});

router
  .route('/:productId')
  .get(async (req, res) => {
    const { productId } = req.params;
    const orderItem = await OrderItem.findOne({
      where: {
        ProductId: productId,
      },
    });

    const review = await Review.findOne({
      where: {
        UserId: req.user.id,
        ProductId: productId,
      },
    });

    if (!orderItem || review) {
      req.flash(
        'error',
        "You're not allowed to create a review for this product"
      );
      return res.redirect('/');
    }

    const product = await Product.findByPk(productId);
    return res.render('customer/review', { product });
  })
  .post(async (req, res) => {
    const { productId } = req.params;
    const { message, rating } = req.body;
    const { id: userId } = req.user;

    await Review.create({
      UserId: userId,
      ProductId: productId,
      message,
      rating,
    });

    req.flash('success', 'Review submitted!');
    return res.redirect('/');
  });

module.exports = router;
