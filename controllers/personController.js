'use strict';

import {logger} from "../logger";
import {PersonSchema} from "../models/personModel";
import {TaskSchema} from "../models/taskModel";

const mongoose = require('mongoose');
const Person = mongoose.model('Person', PersonSchema);
const Task = mongoose.model('Task', TaskSchema);

exports.list_all_persons = function (req, res) {
  Person.find({}, function (err, person) {
    if (err)
      res.send(err);
    res.json(person);
  });
};

exports.create_a_person = function (req, res) {
  const new_person = new Person(req.body);
  new_person.save(function (err, person) {
    if (err)
      res.send(err);
    res.json(person);
  });
};

exports.read_a_person = function (req, res) {

  Person.findById(req.params.personId, function (err, person) {
    if (err)
      res.send(err);
    logger.log({level: 'info', message: 'Person found', person: person});
    res.json(person);
  });
};

exports.delete_a_person = async function (req, res) {
  let person_tasks = await getPersonTasks(req.params.personId);
  for (let i = 0; i < person_tasks.length; i++) {
    if (person_tasks[i].status === "In progress") {
      person_tasks[i].assignee = "Open";
    }
    person_tasks[i].assignee = null;
    await Task.findOneAndUpdate({_id: person_tasks[i].taskId}, person_tasks[i], function (err, task) {
      if (err)
        res.send(err);
    });
  }
  Person.deleteOne({
    _id: req.params.personId
  }, function (err, person) {
    if (err) res.send(err);
    try {
      // shuffleOpenTasks().then(() => {
      res.json({message: 'Person successfully deleted'});
      // })
    } catch (err) {
      logger.log({level: 'error', message: 'shuffle tasks error', error: err});
    }
  });
};

exports.list_all_persons_tasks = async function (req, res) {
  let peopleWithTasks = [];
  await Person.find({}, async function (err, persons) {
    if (err)
      res.send(err);

    for (let i = 0; i < persons.length; i++) {
      const personId = persons[i]._id;
      let personWithTasks = persons[i];
      let person_tasks = {};
      await Task.find({assignee: personId}, function (err, tasks) {
        if (err)
          res.send(err);
        let personTasks = {
          // tasks,
          all_tasks_amount: tasks.length,
          open_tasks_amount: tasks.filter((task) => task.status === "Open").length,
          sum_tasks: tasks.reduce((prvVal, currVal) => {
            return prvVal + currVal.size
          }, 0)
        };
        person_tasks = personTasks;
        // return personTasks;
      })
      // .select('size status name');
      peopleWithTasks.push({...personWithTasks.toObject(), person_tasks: person_tasks});
    }
    res.json(peopleWithTasks);
  })
};

export const getPersonUsedCapacity = async (personId) => {
  let tasks = await Task.find({assignee: personId, status: {$ne: "Open"}}, function (err, tasks) {
  });
  return tasks.reduce((prvVal, currVal) => {
    return prvVal + currVal.size
  }, 0);
};

export const getPersonTasks = async (personId) => {
  let tasks = await Task.find({assignee: personId}, function (err, tasks) {
    if (err) throw err;
  });
  return {
    tasks,
    sum_tasks: tasks.reduce((prvVal, currVal) => {
      return prvVal + currVal.size
    }, 0)
  }
}

exports.list_person_tasks = async function (req, res) {
  let result = null;
  try {
    result = await getPersonTasks(req.params.personId);
  } catch (err) {
    logger.log({level: 'error', message: 'Error', error: err})
  }
  res.json(result);
};

export const getPersonOccupation = async (personId) => {
  let person_occupation = null;
  await Task.find({assignee: personId}, async (err, tasks) => {
    if (err) throw err;
    person_occupation = tasks.reduce((prvVal, currVal) => {
        return prvVal + currVal.size
    }, 0)
    }
  );
  return person_occupation;
};

export const getPersonById = async (personId) => {
  return Person.findById(personId, async function (err, persons) {
  })
};

