const express = require('express');

const router = express.Router();

// Systems
// [ ] Chat
// [ ] Delivery
// [ ] Product
// [ ] Order
// [ ] Ticket
// [x] User
// [ ] Voucher

const chatRouter = require('./chat');
const chatbotRouter = require('./chatbot');
const deliveryRouter = require('./delivery');
const productRouter = require('./product');
const orderRouter = require('./order');
const ticketRouter = require('./ticket');
const userRouter = require('./user');
const voucherRouter = require('./voucher');

router.use('/chat', chatRouter);
router.use('/chatbot', chatbotRouter);
router.use('/delivery', deliveryRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);
router.use('/ticket', ticketRouter);
router.use('/user', userRouter);
router.use('/voucher', voucherRouter);

router.get('/', (req, res) => {
  return res.json({
    'sigmas with comically large swag': [
      { 'luth andyka': 'https://github.com/lx0f' },
      { 'ira ramos': 'https://github.com/NightmareWaifu' },
      { 'zhe yin': 'https://github.com/Zhe-Yin' },
      { 'declan isaac': 'https://github.com/Ronandt' },
      { 'jia jun': 'https://github.com/HProsperouS' },
    ],
  });
});

module.exports = router;
