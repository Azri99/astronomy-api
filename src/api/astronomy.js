const express = require('express');
const moment = require('moment');

const astromony = require('../controller/astronomy');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { date, hdurl, title } = await astromony.getDailyImage();
    const post = await astromony.insertDailyImage({ date, hdurl, title });
    res.json(post);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
