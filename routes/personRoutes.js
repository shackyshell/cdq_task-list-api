'use strict';
module.exports = function(app) {
  const personList = require('../controllers/personController');

  app.route('/people')
    .get(personList.list_all_persons)
    .post(personList.create_a_person);

  app.route('/people/tasks')
    .get(personList.list_all_persons_tasks);

  app.route('/people/:personId')
    .get(personList.read_a_person)
    .put(personList.update_a_person)
    .delete(personList.delete_a_person);

  app.route('/people/tasks/:personId')
    .get(personList.list_person_tasks);
};
