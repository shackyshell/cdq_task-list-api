import {isFibonacci} from "../controllers/isFibonacci";
import * as assert from 'assert';
import {describe} from "mocha";

describe('isFibonacci Test', function () {
  it('should return is 1 a Fibonacci number', function () {
    assert.equal(isFibonacci(1), true);
  });
  it('should return is 89 a Fibonacci number', function () {
    assert.equal(isFibonacci(89), true);
  });
  it('should return is 35 a Fibonacci number', function () {
    assert.equal(isFibonacci(35), false);
  });
});

// describe('bnb Test', function () {
//   it('should return [2,1]', function () {
//     let task1 = {
//       _id: 'task1',
//       name: "task1",
//       status: 'Open',
//       size: 1
//     };
//     let task2 = {
//       _id: 'task2',
//       name: "task2",
//       status: 'Open',
//       size: 5
//     };
//     let person1 = {
//       _id: 1,
//       name: "person1",
//       capacity: 5
//     };
//     let person2 = {
//       _id: 2,
//       name: "person2",
//       capacity: 3
//     };
//
//     const result = greedyMKP([task1, task2], [person1, person2]);
//     assert.equal(result.length, 2);
//     assert.equal(result[0].assignee, 2);
//     assert.equal(result[1].assignee, 1);
//   });
// });
//
//
// describe('bnb Test', function () {
//   it('should return [null,1,null,2]', function () {
//     let task1 = {
//       _id: 'task1',
//       name: "task1",
//       status: 'Open',
//       size: 1
//     };
//     let task2 = {
//       _id: 'task2',
//       name: "task2",
//       status: 'Open',
//       size: 5
//     };
//     let task3 = {
//       _id: 'task3',
//       name: "task3",
//       status: 'Open',
//       size: 1
//     };
//     let task4 = {
//       _id: 'task4',
//       name: "task4",
//       status: 'Open',
//       size: 3
//     };
//     let person1 = {
//       _id: 1,
//       name: "person1",
//       capacity: 5
//     };
//     let person2 = {
//       _id: 2,
//       name: "person2",
//       capacity: 3
//     };
//
//     const result = greedyMKP([task1, task2, task3, task4], [person1, person2]);
//     assert.equal(result.length, 4);
//     assert.equal(result[0].assignee, null);
//     assert.equal(result[1].assignee, 1);
//     assert.equal(result[2].assignee, null);
//     assert.equal(result[3].assignee, 2);
//   });
// });
