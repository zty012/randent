export const choice = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
export const randint = (a: number, b: number): number =>
  Math.floor(Math.random() * (b - a + 1) + a);
