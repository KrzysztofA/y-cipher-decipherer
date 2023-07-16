const stringToNumbersString = (str) => {
  /* Converts string to string of numbers corresponding to their position in the alphabet - 0 to 25 */
  return str
    .split("")
    .map((x) => (x === "_" ? x : semiMod26(x.charCodeAt() - "a".charCodeAt())))
    .join(" ");
};

const stringToNumbersList = (str) => {
  /* Converts string to list of numbers corresponding to their position in the alphabet - 0 to 25 */
  return str
    .toLowerCase()
    .split("")
    .map((x) => (x === "_" ? x : semiMod26(x.charCodeAt() - "a".charCodeAt())));
};

const numbersToString = (num) => {
  /* Converts string of numbers to string of letters with their position in the alphabet as the key - 0 to 25 */
  return num
    .split(" ")
    .map((x) => String.fromCharCode("a".charCodeAt() + semiMod26(x)))
    .join("")
    .toUpperCase();
};

const numbersListToString = (lst) => {
  /* Converts list of numbers to string of letters with their position in the alphabet as the key - 0 to 25 */
  return lst
    .map((x) => String.fromCharCode("a".charCodeAt() + semiMod26(x)))
    .join("")
    .toUpperCase();
};

const gcd = (a, b) => {
  /* Recursive euclidean algorithm to find the greatest common denominator */
  if (a == null || b == null) {
    return null;
  }
  return a == 0 ? b : b == 0 ? a : gcd(b, a % b);
};

const simplifyFraction = (numerator, denominator) => {
  /* Simplify Fraction by finding greatest common denominator and then dividing both numerator and denominator by it */
  let d = gcd(numerator, denominator);
  return numerator === 0 || denominator === 0
    ? [0, 0]
    : [numerator / d, denominator / d];
};

const computeDeterminant = (matrix) => {
  /* Computes determinant of 2 by 2 matrix */
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
};

const trueMod13 = (num) => {
  if (num < 0) {
    num *= -1;
    num = mulInverse13[`${num % 13}`];
  }
  return num % 13;
};

const trueMod26 = (num) => {
  // Use to get mod 26 of divided numbers
  return [trueMod13(num) % 26, (trueMod13(num) + 13) % 26];
};

const semiMod26 = (num) => {
  // Use to get mod 26 of negative numbers
  if (num < 0) {
    num *= -1;
    num = num % 26;
    num = 26 - num;
  }
  return num % 26;
};

const inverseMatrixMod26 = (matrix) => {
  // Function to compute inverse matrix in mod 26
  let det = semiMod26(computeDeterminant(matrix));
  if (det == null) {
    return null;
  }
  return [
    [matrix[1][1], -matrix[0][1]]
      .map((x) => x * mulInverse26[`${det}`])
      .map((x) => semiMod26(x)),
    [-matrix[1][0], matrix[0][0]]
      .map((x) => x * mulInverse26[`${det}`])
      .map((x) => semiMod26(x)),
  ];
};

const matrixMulDecode = (matA, matB) => {
  // Matrix multiplication with 2x2 matA and 2x[1 to inf] matB that returns
  // list of decoded numbers

  let list = [];

  for (let x in matB[0]) {
    list.push(semiMod26(matA[0][0] * matB[0][x] + matA[0][1] * matB[1][x]));
    list.push(semiMod26(matA[1][0] * matB[0][x] + matA[1][1] * matB[1][x]));
  }

  return list;
};

// List elementwise addition operator
const add = (a, b) => a.map((x, i) => x + b[i]);

// List elementwise substraction operator
const sub = (a, b) => a.map((x, i) => x - b[i]);

// Lookup table for multiplicative inverses of 13
const mulInverse13 = {
  1: 1,
  2: 7,
  3: 9,
  4: 10,
  5: 8,
  6: 11,
  7: 2,
  8: 5,
  9: 3,
  10: 4,
  11: 6,
  12: 12,
};

// Lookup table for multiplicative inverses of 26
const mulInverse26 = {
  1: 1,
  3: 9,
  5: 21,
  7: 15,
  9: 3,
  11: 19,
  15: 7,
  17: 23,
  19: 11,
  21: 5,
  23: 17,
  25: 25,
};

// Only functions common to use are exported, the rest is purely supplementary and are defined only for use case inside of this file
export {
  stringToNumbersString,
  stringToNumbersList,
  numbersToString,
  numbersListToString,
  computeDeterminant,
  gcd,
  add,
  sub,
  trueMod26,
  inverseMatrixMod26,
  matrixMulDecode,
  semiMod26,
  mulInverse13,
  mulInverse26,
};
