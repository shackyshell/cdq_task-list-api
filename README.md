#task list api

##Install dependencies

```aidl
npm i
```
##Run

```aidl
npm start
```

##API

*  GET('/people') - list_all_persons
* POST('/people') - create_a_person
*  GET('/people/tasks') - list_all_persons_tasks
*  GET('/people/:personId') - read_a_person
*  DELETE('/people/:personId') - delete_a_person
*  GET('/people/tasks/:personId') - list_person_tasks
*   GET('/tasks') - list_all_tasks
*   POST('/tasks') - create_a_task
*   GET('/tasks/:taskId') - read_a_task
*   PUT('/tasks/:taskId') - update_a_task
*   DELETE('/tasks/:taskId') - delete_a_task 
*   GET('/shuffle') - shuffle_open_tasks
