import {setRoutes} from "./routes";
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  //create model
  Task = require('./models/taskModel'), //TODO move
  Person = require('./models/personModel'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

setRoutes(app);
app.listen(port, () => {
  console.log('Server started on port ' + port)
});
