const express = require('express');
const router = express.Router();

/*
Use cases:
  view privacy policy
  view refund policy
  view terms of service policy
*/

router.get('/privacy', (req, res) => {
  return res.send('Privacy policy');
});

router.get('/refund', (req, res) => {
  return res.send('Refund policy');
});

router.get('/terms-of-service', (req, res) => {
  return res.send('Terms of service policy');
});

module.exports = router;
