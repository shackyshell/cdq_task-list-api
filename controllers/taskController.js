'use strict';


import {isFibonacci, setTaskAssignee, shuffleOpenTasks, tryToSetTaskAssignee} from "./teskUtils";

const mongoose = require('mongoose');
const Task = mongoose.model('Task');


exports.list_all_tasks = function (req, res) {
  let conditions = {};
  if (req.query.assignee) conditions.assignee = req.query.assignee;
  if (req.query.assignee === 'null') conditions.assignee = null;
  if (req.query.status) conditions.status = req.query.status;
  Task.find(conditions, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_a_task = async function (req, res) {
  let new_task = new Task(req.body);
  const size = new_task.size;
  if (!isFibonacci(size)) {
    res.send('size is not a Fibonacci number');
    return;
  }
  await setTaskAssignee(new_task);
  new_task.save(function (err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};


exports.read_a_task = function (req, res) {
  Task.findById(req.params.taskId, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  })
    .populate('assignee', 'name');
};

exports.update_a_task = async function (req, res) {
  const new_task = new Task(req.body);
  const size = new_task.size;
  if (!isFibonacci(size)) {
    res.send('size is not a Fibonacci number');
    return;
  }
  await tryToSetTaskAssignee(new_task, new_task.assignee);
  Task.findOneAndUpdate({_id: req.params.taskId}, new_task, {new: true}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function (req, res) {
  Task.deleteOne({
    _id: req.params.taskId
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({message: 'Task successfully deleted'});
  });
};



exports.shuffle_open_tasks = async function (req, res) {
  let S = [];
  try {
    S = await shuffleOpenTasks();
  } catch (err) {
    res.send(err)
  }
  res.json(S);
};



