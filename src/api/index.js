const express = require('express');

const astronomy = require('./astronomy');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/astronomy', astronomy);

module.exports = router;
