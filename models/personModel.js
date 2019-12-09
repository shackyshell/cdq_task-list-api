'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PersonSchema = new Schema({
  name: {
    type: String
  },
  capacity: {
    type: Number,
    default: 0 //TODO less or equal to 40
  }
});

module.exports = mongoose.model('Person', PersonSchema);
