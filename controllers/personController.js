'use strict';

const mongoose = require('mongoose');
const Person = mongoose.model('Person');
const Task = mongoose.model('Task');

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
    res.json(person);
  });
};


exports.update_a_person = function (req, res) {
  Person.findOneAndUpdate({_id: req.params.personId}, req.body, {new: true}, function (err, person) {
    if (err)
      res.send(err);
    res.json(person);
  });
};

exports.delete_a_person = function (req, res) {
  Person.remove({
    _id: req.params.personId
  }, function (err, person) {
    if (err)
      res.send(err);
    res.json({message: 'Person successfully deleted'});
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

exports.list_person_tasks = function (req, res) {
  const personId = req.params.personId;
  Task.find({assignee: personId}, function (err, tasks) {
    if (err)
      res.send(err);
    let result = {
      tasks,
      sum_tasks: tasks.reduce((prvVal, currVal) => {
        return prvVal + currVal.size
      }, 0)
    };
    res.json(result);
  });
};

export async function getPersonOccupation(personId) {
  let person_occupation = null;
  await Task.find({assignee: personId}, async (err, tasks) => {
      if (err) {
        throw SQLException;
      }
    person_occupation = tasks.reduce((prvVal, currVal) => {
        return prvVal + currVal.size
    }, 0)
    }
  );
  return person_occupation;
}

