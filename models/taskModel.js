'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String
  },
  status: {
      type: String,
      enum: ['Open', 'In progress', 'Closed'],
    default: 'Open'
  },
  size: {
    type: Number,
    default: 0,
    min: 0
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  },
});

module.exports = mongoose.model('Task', TaskSchema);
