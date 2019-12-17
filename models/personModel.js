'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


export const PersonSchema = new Schema({
  name: {
    type: String
  },
  capacity: {
    type: Number,
    default: 0,
    min: 0,
    max: [40, 'Too large capacity']
  }
  })
;

module.exports = mongoose.model('Person', PersonSchema);
