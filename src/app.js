const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
require('dotenv').config();
require('mongoose').connect(process.env.MONGO_URL)
.then(()=>{
  console.log('mongo conn')  
})
.catch((e)=>{
  console.log(e)
  
})

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  handler: function(req, res) {
  	res.status(this.statusCode).json({
		message: this.message,
	});
  },
}));

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
