const { Schema, model } = require('mongoose');

const astronomySchema = new Schema({
  date: {type: Date, required: true, unique: true},
  hdurl: {type: String, required: true},
  title: {type: String, required: true},
  isLiked: {type: Boolean}
});

module.exports = model('astronomy', astronomySchema);


