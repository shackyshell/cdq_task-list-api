'use strict';


import {greedyMKP, isFibonacci} from "./teskUtils";
import {getPersonCapacityById, getPersonOccupation, getPersonUsedCapacity} from "./personController";
import * as _ from 'lodash'

const mongoose = require('mongoose');
const Person = mongoose.model('Person');
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
  let chosenPersonOccupation = null;
  for (let i = 0; i < 2; i++) {
    chosenPersonOccupation = await getLeastOccupiedPerson();
    let person = await getPersonCapacityById(chosenPersonOccupation.personId);
    if (chosenPersonOccupation.occupation + size > person.capacity) {
      console.log('if');
      try {
        await shuffleOpenTasks();
      } catch (err) {
        console.log(err);
      }
      new_task.assignee = null;
    } else {
      console.log('else');
      new_task.assignee = chosenPersonOccupation.personId;
      break;
    }
  }
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
  Task.deleteOne({
    _id: req.params.taskId
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({message: 'Task successfully deleted'});
  });
};

export const shuffleOpenTasks = async () => {
  let all_tasks = await Task.find({status: "Open"}, function (err, tasks) {
    if (err) throw err;
  });
  let all_people = await Person.find({}, function (err, persons) {
    if (err) throw err;
  });

  const all_people_with_last_capacity = [];
  for (let i = 0; i < all_people.length; i++) {
    let uc = await getPersonUsedCapacity(all_people[i]._id);
    const personWithLastCapacity = {...all_people[i].toObject(), capacity: all_people[i].capacity - uc, uc: uc};
    all_people_with_last_capacity.push(personWithLastCapacity)
  }
  console.log(all_people_with_last_capacity);
  let S = greedyMKP(all_tasks, all_people_with_last_capacity);
  console.log(S);
  for (let i = 0; i < S.length; i++) {
    Task.findOneAndUpdate({_id: S[i]._id}, S[i], {new: true}, function (err, task) {
      if (err) throw err;
    });
  }
  console.log('exit shuffleOpenTasks');
  return S;

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



