const express = require('express');
const moment = require('moment');
const Cache = require('node-cache');

const astromony = require('../controller/astronomy');

const cache = new Cache();

const router = express.Router();


router.get('/', async (req, res, next) => {
  let date = moment().subtract(1, 'days')
  .format('YYYY-MM-DD');
  
  let imageCache = cache.get(date) || await astromony.getDailyImageDb();
  if (imageCache){
    cache.set(date, imageCache, 86400);
    res.json(imageCache);
    return;
  } 

  try {
    const imageData = await astromony.getDailyImage();
    await astromony.insertDailyImage(imageData);
   
    cache.set(date, imageData, 86400);
   
    res.json(imageData);
  } catch (error) {
    next(error)
  }

});

module.exports = router;
