'use strict';


import {isFibonacci} from "./teskUtils";

const mongoose = require('mongoose'),
  Task = mongoose.model('Task');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_task = function(req, res) {
  const new_task = new Task(req.body);
  const size = new_task.size;
  if (!isFibonacci(size)) {
    res.send('size is not a Fibonacci number');
    return;
  }
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  const new_task = new Task(req.body);
  const size = new_task.size;
  if (!isFibonacci(size)) {
    res.send('size is not a Fibonacci number');
    return;
  }
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

