'use strict';


import {isFibonacci} from "./teskUtils";
import {getPersonOccupation} from "./personController";
import * as _ from 'lodash'

const mongoose = require('mongoose');
const Person = mongoose.model('Person');
const Task = mongoose.model('Task');


exports.list_all_tasks = function (req, res) {
  Task.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

const getLeastOccupiedPerson = async () => {
  let all_persons = [];
  await Person.find({}, function (err, persons) {
    if (err)
      throw err;
    all_persons = persons;
  });

  const personsOccupationArray = [];
  for (let i = 0; i < all_persons.length; i++) {
    personsOccupationArray.push({
      personId: all_persons[i]._id,
      occupation: await getPersonOccupation(all_persons[i]._id)
    });
  }
  const chosenPersonOccupation = _.minBy(personsOccupationArray, 'occupation');
  console.log('personsOccupationArray', personsOccupationArray);
  console.log('chosenPersonOccupation', chosenPersonOccupation);
  return chosenPersonOccupation;
}

exports.create_a_task = async function (req, res) {
  let new_task = new Task(req.body);
  const size = new_task.size;
  if (!isFibonacci(size)) {
    res.send('size is not a Fibonacci number');
    return;
  }
  try {
    const chosenPersonOccupation = await getLeastOccupiedPerson();
    //TODO if(chosenPerosnOccupation + size > 40) {shuffle()}
    new_task.assignee = chosenPersonOccupation.personId;
  } catch (err) {
    res.send(err);
  }
  new_task.save(function (err, task) {
    if (err)
      res.send(err);
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

exports.update_a_task = function (req, res) {
  const new_task = new Task(req.body);
  const size = new_task.size;
  if (!isFibonacci(size)) {
    res.send('size is not a Fibonacci number');
    return;
  }
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function (req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({message: 'Task successfully deleted'});
  });
};

exports.shuffle_open_tasks = function (req, res) {
  Task.find({}, function (err, tasks) {
    if (err)
      res.send(err);
    //TODO
    console.log(tasks);
    res.json(tasks);
  });
};



