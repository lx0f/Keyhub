const express = require('express');
const router = express.Router();
const { Ticket } = require('../../models');

/*
Use cases:
  send ticket
  view open tickets
  view closed
*/

// redirect to login if unauthenticated
router.use((req, res, next) => {
  if (req.method !== 'GET' && req.isUnauthenticated()) {
    req.flash('error', 'Login first!');
    return res.redirect('/login');
  }
  next();
});

router
  .route('/')
  .get((req, res) => {
    return res.render('customer/ticket');
  })
  .post(async (req, res) => {
    const userId = req.user.id;
    let { title, description, category, severity } = req.body;

    let hasError = false;
    if (!title) {
      req.flash('error', 'Title is missing!');
      hasError = true;
    }
    if (!category) {
      req.flash('error', 'Category is missing!');
      hasError = true;
    }
    if (!severity) {
      req.flash('error', 'Severity is missing!');
      hasError = true;
    }

    if (hasError) {
      return res.redirect('back');
    }

    await Ticket.create({
      UserId: userId,
      title,
      description,
      category,
      severity,
    });

    req.flash('success', 'Ticket submitted!');
    return res.redirect('/ticket');
  });

module.exports = router;
