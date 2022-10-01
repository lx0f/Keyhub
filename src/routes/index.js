const express = require('express');
const router = express.Router();

const apiRouter = require('./api');
const customerRouter = require('./customer');
const staffRouter = require('./staff');

router.use('/', customerRouter);
router.use('/api', apiRouter);
router.use('/staff', staffRouter);

router.get('/', async (req, res) => {
  return res.render('home');
});

module.exports = router;
