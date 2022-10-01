const express = require('express');
const router = express.Router();

const { detectIntent } = require('../../services');

router
  .route('/')
  .get(async (req, res) => {})
  .post(async (req, res) => {
    const { query } = req.body;
    console.log(query);
    const sessionId = req.session.id;
    const result = await detectIntent(sessionId, query);
    return res.json(result);
  });

module.exports = router;
