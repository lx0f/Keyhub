const express = require('express');
const OrderManagement = express.Router();
const { Order } = require('../models/order');
const { OrderItem } = require('../models/order');
const { Cancelrequest } = require('../models/order');
const Product = require('../models/product');

const User = require('../models/User');

const { Payment } = require('../models/order');
const { Cart } = require('../models/cart');

const moment = require('moment');
const cron = require('node-cron');

cron.schedule('*/15 * * * * ', async () => {
    console.log('running a task every 15 minute');
    let orders = await Order.findAll({
        where: { payment_status: 0 && order_status != 'Cancelled' },
    });
    orders.forEach((order) => {
        var createAt = moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss');
        console.log(createAt);
        var now = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(now);
        var minute = moment(now).diff(moment(createAt), 'minutes');
        console.log(minute);
        if (minute > 30) {
            Order.update(
                { order_status: 'Cancelled' },
                { where: { id: order.id } }
            );
            console.log('Hello');
        }
    });
});

// Get Orders
OrderManagement.get('/', async (req, res) => {
    const orders = await Order.findAll({
        include: [
            {
                model: OrderItem,
                include: {
                    model: Product,
                },
            },
            {
                model: User,
            },
        ],
    });
    return res.render('./staff/ordermanagement/staff-getorders', { orders });
});

// Approved cancel request
// Have to consider the delivery status of the order see if cancel
OrderManagement.get('/cancelorder/:id', async function (req, res) {
    try {
        let request = await Cancelrequest.findOne({
            where: { OrderId: req.params.id },
        });

        if (!request) {
            flash(res, 'error', 'request not found');
            res.redirect('/staff/manage_order/cancelrequests');
            return;
        }
        if (request.status != 'null') {
            req.flash('error', ' You have already rejected or approved it');
            res.redirect('/staff/manage-orders/cancelrequests');
        } else {
            let result = await Cancelrequest.update(
                { status: 'Approved' },
                { where: { id: request.id } }
            );
            let o = await Order.update(
                { order_status: 'Cancelled' },
                { where: { id: req.params.id } }
            );

            req.flash('success', 'Order Cancellation ' + ' is Approved!');
            res.redirect('/staff/manage-orders/cancelrequests');
        }
    } catch (err) {
        console.log(err);
    }
});

// Reject Cancel Request
OrderManagement.get('/rejectcancelorder/:id', async function (req, res) {
    try {
        const request = await Cancelrequest.findOne({
            where: { OrderId: req.params.id },
        });

        if (!request) {
            flash(res, 'error', 'request not found');
            res.redirect('/staff/manage_order/cancelrequests');
            return;
        }
        console.log(request.status);
        if (request.status != 'null') {
            req.flash('error', ' You have already rejected or approved it');
            res.redirect('/staff/manage-orders/cancelrequests');
        } else {
            let result = await Cancelrequest.update(
                { status: 'Rejected' },
                { where: { id: request.id } }
            );
            req.flash('success', 'Order Cancellation ' + ' is Rejected!');
            res.redirect('/staff/manage-orders/cancelrequests');
        }
    } catch (err) {
        console.log(err);
    }
});

// Retrieve Cancellation Request
OrderManagement.get('/cancelrequests', async function (req, res) {
    try {
        const requests = await Cancelrequest.findAll({
            include: [
                {
                    model: Order,
                    include: [
                        {
                            model: OrderItem,
                            include: {
                                model: Product,
                            },
                        },
                        {
                            model: User,
                        },
                    ],
                },
            ],
        });
        return res.render('./staff/ordermanagement/staff-cancel-request', {
            requests,
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = OrderManagement;
