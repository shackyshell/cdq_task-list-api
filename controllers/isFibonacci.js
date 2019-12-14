export function isFibonacci(n) {
  const a = (5 * Math.pow(n, 2) + 4);
  const b = (5 * Math.pow(n, 2) - 4);

  const result = Math.sqrt(a) % 1 === 0;
  const res = Math.sqrt(b) % 1 === 0;

  return result || res === true;
}
