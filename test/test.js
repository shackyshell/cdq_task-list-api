// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

import {greedyMKP, isFibonacci} from "../controllers/teskUtils";
import * as assert from 'assert';

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

// //During the test the env variable is set to test
// process.env.NODE_ENV = 'test';
//
// let mongoose = require("mongoose");
// let Book = require('../models/taskModel');
//
// //Require the dev-dependencies
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../server');
// let should = chai.should();
//
//
// chai.use(chaiHttp);
// //Our parent block
// describe('Books', () => {
//   beforeEach((done) => { //Before each test we empty the database
//     Book.remove({}, (err) => {
//       done();
//     });
//   });
//   /*
//     * Test the /GET route
//     */
//   describe('/GET book', () => {
//     it('it should GET all the books', (done) => {
//       chai.request(server)
//         .get('/book')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('array');
//           res.body.length.should.be.eql(0);
//           done();
//         });
//     });
//   });
//
// });

describe('bnb Test', function () {
  it('should return [2,1]', function () {
    let task1 = {
      _id: 'task1',
      name: "task1",
      status: 'Open',
      size: 1
    };
    let task2 = {
      _id: 'task2',
      name: "task2",
      status: 'Open',
      size: 5
    };
    let person1 = {
      _id: 1,
      name: "person1",
      capacity: 5
    };
    let person2 = {
      _id: 2,
      name: "person2",
      capacity: 3
    };

    const result = greedyMKP([task1, task2], [person1, person2]);
    assert.equal(result.length, 2);
    assert.equal(result[0].assignee, 2);
    assert.equal(result[1].assignee, 1);
  });
});


describe('bnb Test', function () {
  it('should return [null,1,null,2]', function () {
    let task1 = {
      _id: 'task1',
      name: "task1",
      status: 'Open',
      size: 1
    };
    let task2 = {
      _id: 'task2',
      name: "task2",
      status: 'Open',
      size: 5
    };
    let task3 = {
      _id: 'task3',
      name: "task3",
      status: 'Open',
      size: 1
    };
    let task4 = {
      _id: 'task4',
      name: "task4",
      status: 'Open',
      size: 3
    };
    let person1 = {
      _id: 1,
      name: "person1",
      capacity: 5
    };
    let person2 = {
      _id: 2,
      name: "person2",
      capacity: 3
    };

    const result = greedyMKP([task1, task2, task3, task4], [person1, person2]);
    assert.equal(result.length, 4);
    assert.equal(result[0].assignee, null);
    assert.equal(result[1].assignee, 1);
    assert.equal(result[2].assignee, null);
    assert.equal(result[3].assignee, 2);
  });
});
