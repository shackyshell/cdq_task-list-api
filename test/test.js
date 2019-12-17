import {isFibonacci} from "../controllers/isFibonacci";
import * as assert from 'assert';
import {describe} from "mocha";
import {greedyMKP} from "../controllers/taskService";


const Task = require('../models/taskModel');
const Person = require('../models/personModel');

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

describe('bnb Test', function () {
  it('should return [2,1]', function () {
    let task1 = new Task({
      name: "task1",
      status: 'Open',
      size: 1
    });
    let task2 = new Task({
      name: "task2",
      status: 'Open',
      size: 5
    });
    let person1 = new Person({
      name: "person1",
      capacity: 5
    });
    let person2 = new Person({
      name: "person2",
      capacity: 3
    });

    const result = greedyMKP([task1, task2], [person1, person2]);
    assert.equal(result.length, 2);
    assert.equal(result[0].assignee, person2._id);
    assert.equal(result[1].assignee, person1._id);
  });
});


describe('bnb Test', function () {
  it('should return [null,1,null,2]', function () {
    let task1 = new Task({
      name: "task1",
      status: 'Open',
      size: 1
    });
    let task2 = new Task({
      name: "task2",
      status: 'Open',
      size: 5
    });
    let task3 = new Task({
      name: "task3",
      status: 'Open',
      size: 1
    });
    let task4 = new Task({
      name: "task4",
      status: 'Open',
      size: 3
    });
    let person1 = new Person({
      name: "person1",
      capacity: 5
    });
    let person2 = new Person({
      name: "person2",
      capacity: 3
    });

    const result = greedyMKP([task1, task2, task3, task4], [person1, person2]);
    assert.equal(result.length, 4);
    assert.equal(result[0].assignee, null);
    assert.equal(result[1].assignee, person1._id);
    assert.equal(result[2].assignee, null);
    assert.equal(result[3].assignee, person2._id);
  });
});


//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Tasks', () => {
  beforeEach((done) => { //Before each test empty the database
    Task.remove({}, (err) => {
      done();
    });
  });
  /*
    * Test the /GET route
    */
  describe('/GET tasks', () => {
    it('it should GET all the tasks', (done) => {
      chai.request(server)
        .get('/tasks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST tasks', () => {
    it('it should POST task', function (done) {
      this.timeout(5000);
      let task = {
        name: "Zamiatanie podłogi",
        status: "Open",
        size: 1,
        assignee: "abc-123"
      };

      chai.request(server)
        .post('/tasks')
        .send(task)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('assignee').that.is.equal(null);
          done();
        });
    });
  });
});
