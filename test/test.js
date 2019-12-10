// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

import {isFibonacci} from "../controllers/teskUtils";
import * as assert from 'assert';
// var assert = require('assert');

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
