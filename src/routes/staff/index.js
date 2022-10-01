const express = require('express');
const moment = require('moment');
const { Op, Sequelize } = require('sequelize');
const { Order, Product, OrderItem, Ticket } = require('../../models');
const router = express.Router();

// change handlebar default layout
router.all('/*', function (req, res, next) {
  req.app.locals.layout = 'staff';
  next();
});

const chatRouter = require('./chat');
const deliveryRouter = require('./delivery');
const orderRouter = require('./order');
const productRouter = require('./product');
const ticketRouter = require('./ticket');
const userRouter = require('./user');
const voucherRouter = require('./voucher');

router.use('/chat', chatRouter);
router.use('/delivery', deliveryRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/ticket', ticketRouter);
router.use('/user', userRouter);
router.use('/voucher', voucherRouter);

router.get('/', async (req, res) => {
  const orders = await Order.findAll({
    where: {
      createdAt: {
        // >= 7 days ago
        [Op.gte]: moment().subtract(7, 'days').toDate(),
      },
    },
  });
  var revenue = 0;
  for (const order of orders) {
    revenue += order.total;
  }

  const closed = await Ticket.count({
    where: {
      status: 'closed',
    },
  });
  const open = await Ticket.count({
    where: {
      status: 'open',
    },
  });
  var ticketsData = {
    labels: ['open', 'closed'],
    datasets: [
      {
        label: 'Tickets',
        data: [open, closed],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };
  ticketsData = JSON.stringify(ticketsData);
  return res.render('staff/dashboard', { revenue, ticketsData });
});

module.exports = router;
