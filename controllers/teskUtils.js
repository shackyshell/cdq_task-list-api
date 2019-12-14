export function isFibonacci(n) {
  const a = (5 * Math.pow(n, 2) + 4);
  const b = (5 * Math.pow(n, 2) - 4);

  const result = Math.sqrt(a) % 1 === 0;
  const res = Math.sqrt(b) % 1 === 0;

  //fixed this line
  if (result || res === true) // checks the given input is fibonacci series
  {
    // let fib = Math.round(n * 1.618); // finds the next fibonacci series of given input
    // console.log("The next Fibonacci number is " + fib);
    return true;
  } else {
    // console.log(`The given number ${n} is not a fibonacci number`);
    return false;
  }
}


// export const greedyMKP = (tasks, people) => {
//   let tasksCopy = [...tasks];
//   let P = [];
//   for (let i = 0; i <  people.length; i++) {
//     P.push([])
//   }
//   tasksCopy.sort((task1, task2) => task2.size - task1.size)
//   for (let i = 0; i < tasks.length; i++) {
//     for (let j = 0; j < people.length; j++) {
//       const sum = P[j].reduce((sum, task) => task.size, 0) + tasksCopy[i].size;
//       if (sum <= people[j].capacity) {
//         P[j].push(tasksCopy[i]);
//         break;
//       }
//     }
//   }
//   let S = [];
//   for (let i = 0; i < tasks.length; i++) {
//     S.push(0)
//   }
//   for (let j = 0; j < P.length; j++) {
//   for (let i = 0; i < P[j].length; i++) {
//     const task = P[j][i];
//     const indexOf = tasks.indexOf(task);
//     S[indexOf] = people[j]._id
//     }
//   }
//   return S;
// };

export const greedyMKP = (tasks, people) => {
  let tasksCopy = [...tasks];
  let P = [];
  for (let i = 0; i < people.length; i++) {
    P.push([])
  }
  tasksCopy.sort((task1, task2) => task2.size - task1.size)
  for (let i = 0; i < tasks.length; i++) {
    for (let j = 0; j < people.length; j++) {
      const sum = P[j].reduce((sum, task) => sum + task.size, 0) + tasksCopy[i].size;
      let last_capacity = people[j].capacity - people[j].uc;
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
  // console.log(S);
  return S;
};
