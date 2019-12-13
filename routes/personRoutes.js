'use strict';
module.exports = function(app) {
  const personList = require('../controllers/personController');

  app.route('/people')
    .get(personList.list_all_persons)
    .post(personList.create_a_person);


  app.route('/people/:personId')
    .get(personList.read_a_person)
    .put(personList.update_a_person)
    .delete(personList.delete_a_person);

  app.route('/people/:personId/tasks')
    .get(personList.list_all_person_tasks);
};
