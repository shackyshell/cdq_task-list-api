import {getPersonById, getPersonOccupation, getPersonUsedCapacity} from "./personController";
import * as mongoose from 'mongoose';
import * as _ from "lodash";
import {logger} from "../logger";

const Person = mongoose.model('Person');
const Task = mongoose.model('Task');

export const greedyMKP = (tasks, people, prioritarized_task) => {
  let tasksCopy = [...tasks];
  let P = [];
  for (let i = 0; i < people.length; i++) {
    P.push([])
  }
  tasksCopy.sort((task1, task2) => task2.size - task1.size);
  if (prioritarized_task) {
    tasksCopy = tasksCopy.filter((task) => task._id !== prioritarized_task._id);
    tasksCopy.unshift(prioritarized_task);
  }
  for (let i = 0; i < tasks.length; i++) {
    for (let j = 0; j < people.length; j++) {
      const sum = P[j].reduce((part_sum, task) => part_sum + task.size, 0) + tasksCopy[i].size;
      let last_capacity = people[j].uc ? people[j].capacity - people[j].uc : people[j].capacity;
      if (sum <= last_capacity) {
        P[j].push(tasksCopy[i]);
        break;
      }
    }
  }
  let S = [];
  for (let i = 0; i < tasks.length; i++) {
    S.push({...tasks[i].toObject(), assignee: null})
  }
  for (let j = 0; j < P.length; j++) {
    for (let i = 0; i < P[j].length; i++) {
      const task = P[j][i];
      const indexOf = tasks.indexOf(task);
      S[indexOf] = {...S[indexOf], assignee: people[j]._id}
    }
  }
  return S;
};


export const shuffleOpenTasks = async (prioritarized_task) => {
  let all_tasks = await Task.find({status: "Open"}, function (err, tasks) {
    if (err) throw err;
  });
  let all_people = await Person.find({}, function (err, persons) {
    if (err) throw err;
  });

  const all_people_with_last_capacity = [];
  for (let i = 0; i < all_people.length; i++) {
    let uc = await getPersonUsedCapacity(all_people[i]._id);
    const personWithLastCapacity = {...all_people[i].toObject(), capacity: all_people[i].capacity, uc: uc};
    all_people_with_last_capacity.push(personWithLastCapacity)
  }
  let S = greedyMKP(all_tasks, all_people_with_last_capacity, prioritarized_task);
  for (let i = 0; i < S.length; i++) {
    Task.findOneAndUpdate({_id: S[i]._id}, S[i], {new: true}, function (err, task) {
      if (err) {
        logger.log({level: 'error', message: 'shuffle tasks error', error: err});
        throw err;
      }
    });
  }
  return S;
};


export const getLeastOccupiedPerson = async (size) => {
  let all_persons = [];
  await Person.find({}, function (err, persons) {
    if (err)
      throw err;
    all_persons = persons;
  });

  const personsOccupationArray = [];
  for (let i = 0; i < all_persons.length; i++) {
    let uc = await getPersonUsedCapacity(all_persons[i]._id);
    let personWithCapacity = await getPersonById(all_persons[i]._id);
    let occupation = await getPersonOccupation(all_persons[i]._id);
    personsOccupationArray.push({
      personId: all_persons[i]._id,
      occupation: occupation,
      last_capacity: personWithCapacity.capacity - uc
    });
  }
  const chosenPersonOccupation = _.maxBy(personsOccupationArray, (item) => {
    if (item.last_capacity - item.occupation > size) {
      return item.last_capacity - item.occupation;
    }
  });
  return chosenPersonOccupation;
}

//TODO refactor
export const setTaskAssignee = async (new_task, assignee = null) => {
  for (let i = 0; i < 2; i++) {
    let chosenPersonOccupation = await getLeastOccupiedPerson(new_task.size);
    let person = assignee;
    if (chosenPersonOccupation && person === null) {
      person = await getPersonById(chosenPersonOccupation.personId);
    }
    if (chosenPersonOccupation && person && chosenPersonOccupation.occupation + new_task.size < person.capacity) {
      new_task.assignee = chosenPersonOccupation.personId;
      break;
    } else {
      try {
        await shuffleOpenTasks();
      } catch (err) {
        logger.log({level: 'error', message: 'shuffle tasks error', error: err});
      }
      new_task.assignee = null;
    }
  }
};

export const tryToSetTaskAssignee = async (new_task, assigneeId) => {
  let person = await getPersonById(assigneeId);
  if (!person) {
    logger.log({level: 'info', message: 'This person does not exist'});
    new_task.assignee = null;
    return;
  }
  const occupation = await getPersonOccupation(person._id);
  let chosenPersonOccupation = {personId: person._id, occupation};
  for (let i = 0; i < 2; i++) {
    const newOccupation = chosenPersonOccupation ? chosenPersonOccupation.occupation : null;
    if (newOccupation && person && newOccupation <= person.capacity) {
      new_task.assignee = chosenPersonOccupation.personId;
      break;
    } else {
      try {
        await shuffleOpenTasks(new_task);
      } catch (err) {
        logger.log({level: 'error', message: 'shuffle tasks error', error: err});
      }
      chosenPersonOccupation = await getLeastOccupiedPerson(new_task.size);
      if (chosenPersonOccupation) {
        person = await getPersonById(chosenPersonOccupation.personId);
      }
      new_task.assignee = null;
    }
  }
};
