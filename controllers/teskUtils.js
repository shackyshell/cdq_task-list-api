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
