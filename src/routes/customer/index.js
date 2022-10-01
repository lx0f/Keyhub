const express = require('express');
const router = express.Router();

// change handlebar default layout
router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'main';
  next();
});

const accountRouter = require('./account');
const cartRouter = require('./cart');
const chatRouter = require('./chat');
const deliveryRouter = require('./delivery');
const orderRouter = require('./order');
const policyRouter = require('./policies');
const reviewRouter = require('./review');
const productRouter = require('./product');
const ticketRouter = require('./ticket');
const userRouter = require('./user');
const voucherRouter = require('./voucher');

router.use('/', userRouter);
router.use('/account', accountRouter);
router.use('/cart', cartRouter);
router.use('/chat', chatRouter);
router.use('/delivery', deliveryRouter);
router.use('/order', orderRouter);
router.use('/policy', policyRouter);
router.use('/product', productRouter);
router.use('/review', reviewRouter);
router.use('/ticket', ticketRouter);
router.use('/voucher', voucherRouter);

module.exports = router;
