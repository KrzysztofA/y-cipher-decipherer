import {
  stringToNumbersList,
  sub,
  gcd,
  mulInverse13,
  trueMod26,
  computeDeterminant,
  inverseMatrixMod26,
  matrixMulDecode,
  numbersListToString,
  semiMod26,
  mulInverse26,
} from "./utils.js";

const solveLinearEq = async (eq1, eq2) => {
  /* Solves system of 2 linear equations in form a * x1 + b * x2 = y1 mod 26, 
     c * x1 + d * x2 = y2 mod 26, where a b c d y1 and y2 
     are constants and x1, x2 are unknowns */

  let equation1, equation2;

  // Multiply each equation by coefficiant of the 2nd term of the other equation,
  // SPECIAL case - one of the 2nd terms is 0 Chose another set
  if (eq2[1] != 0 && eq1[1] != 0) {
    equation1 = eq1.map((x) => semiMod26(x * eq2[1]));
    equation2 = eq2.map((x) => semiMod26(x * eq1[1]));
  } else if (eq2[0] != 0 && eq1[0] != 0) {
    equation1 = eq1.map((x) => semiMod26(x * eq2[0]));
    equation2 = eq2.map((x) => semiMod26(x * eq1[0]));
  } else {
    return eq1[1] === 0
      ? trueMod26(
          eq1[2] *
            (mulInverse13[`${eq1[0]}`]
              ? mulInverse13[`${eq1[0]}`]
              : mulInverse26[`${eq1[0]}`])
        )
      : trueMod26(
          eq2[2] *
            (mulInverse13[`${eq2[0]}`]
              ? mulInverse13[`${eq2[0]}`]
              : mulInverse26[`${eq2[0]}`])
        );
  }

  // Substract equation 2 from equation 1 to get rid of the 2nd term
  // (due to previous step 2nd term of the 1st and 2nd equation is equal)
  equation1 = sub(equation1, equation2);
  equation1 = equation1.map((x) => (x < 0 ? semiMod26(x) : x));

  // Reducing modulus to %13 by finding greatest common denominator
  let divident = gcd(gcd(equation1[0], equation1[2]), 26);
  if (divident == 0) {
    divident = gcd(gcd(equation1[1], equation1[2], 26));
  }

  equation1 = equation1.map((x) => x / divident);
  equation1 = equation1.map((x) =>
    mulInverse26[`${equation1[0]}`]
      ? x * mulInverse26[`${equation1[0]}`]
      : x * mulInverse13[`${equation1[0]}`]
  );

  return trueMod26(equation1[2]);
};

const computePossibleKeys = async (codeMatrix, clueMatrix) => {
  /* Function used to compute all possible keys, if no key is valid returns undefined, else returns 
     possible keys */

  // Our linear equations have form: clueMatrix[0][0]*x1 + clueMatrix[0][1]*x2 = codedMatrix[0][0] mod 26
  // System is as follows:

  // Solve for x1 or a:

  let a = solveLinearEq(
    [clueMatrix[0][0], clueMatrix[0][1], codeMatrix[0][0]],
    [clueMatrix[1][0], clueMatrix[1][1], codeMatrix[1][0]]
  );

  // Solve for x2 or b:

  let b = solveLinearEq(
    [clueMatrix[0][1], clueMatrix[0][0], codeMatrix[0][0]],
    [clueMatrix[1][1], clueMatrix[1][0], codeMatrix[1][0]]
  );

  // Solve for x3 or c:

  let c = solveLinearEq(
    [clueMatrix[0][0], clueMatrix[0][1], codeMatrix[0][1]],
    [clueMatrix[1][0], clueMatrix[1][1], codeMatrix[1][1]]
  );

  // Solve for x4 or d:

  let d = solveLinearEq(
    [clueMatrix[0][1], clueMatrix[0][0], codeMatrix[0][1]],
    [clueMatrix[1][1], clueMatrix[1][0], codeMatrix[1][1]]
  );

  // Now create all possible combinations of Key Matrix which results in a very ugly set of nested loops
  let keyMat = [];

  return Promise.all([a, b, c, d]).then((values) => {
    for (let as of values[0]) {
      for (let bs of values[1]) {
        for (let cs of values[2]) {
          for (let ds of values[3]) {
            let temp = [
              [as, bs],
              [cs, ds],
            ];
            let tempDet = computeDeterminant(temp);

            // Decide if key valid by computing determinant and checking it against 13 and 2
            if (tempDet % 13 !== 0 && tempDet % 2 !== 0) {
              keyMat.push(temp);
            }
          }
        }
      }
    }

    // If no valid key computed return null (don't throw anything as it is not expection, in fact this should be somewhat expected
    // from time to time)

    if (keyMat.length === 0) {
      return undefined;
    }

    return keyMat;
  });
};

export default async function hillcipher(str, clueStr) {
  /* 
     Main function with logic behind decoding hill cipher with clue and coded string. Requires first 4 letters of 
     the coded string and full clue provided. Returns decoded messages and the key used to compute them
     given how hill cipher works and that there is 26 letters in the alphabet, the key usually comes with 
     16 different combinations, with 2 possible values for each cell in a matrix, therefore it will return 16
     different messages from which only by comparing the word with dictionary words the true key can be deduced.    
    */

  // First 4 letters as numbers
  let code = stringToNumbersList(str.slice(0, 4));

  // And clue as numbers
  let clue = stringToNumbersList(clueStr);

  // Now both rearranged as matrix
  let codeMatrix = [
    [code[0], code[1]],
    [code[2], code[3]],
  ];

  let clueMatrix = [
    [clue[0], clue[1]],
    [clue[2], clue[3]],
  ];

  // Now to get all possible and valid keys that match the clue and coded string
  let validKeys = await computePossibleKeys(codeMatrix, clueMatrix);

  if (validKeys == null) {
    return undefined;
  }

  let keyMessageGroup = [];

  // Convert the message to matrix with 2 by size of the message / 2 dimensions
  let codedMsg = stringToNumbersList(str);
  let codedMatrixUp = codedMsg.filter((x, i) => i % 2 === 0);
  let codedMatrixDown = codedMsg.filter((x, i) => i % 2 !== 0);
  let codedMatrix = [codedMatrixUp, codedMatrixDown];

  for (let key of validKeys) {
    // Inverse all the keys and then decrypt the message using inverse key
    let invKey = inverseMatrixMod26(key);
    let decodedMsg = numbersListToString(matrixMulDecode(invKey, codedMatrix));

    // Information returned includes: the key computer from the code and clue, inverse of this key, coded message
    // (the one that was passed), given clue and finally the message it computed
    // Decoded message needs to be compared with the dictionary, it might be not uncommon that 2 variations of the message
    // look correct. It then needs to be analised properly to decide whether it is correct

    // Check if clue in the decoded message is a part of the decoded message, due to how modular arthmetic works it might give out results
    // are not including the clue.
    if (decodedMsg.slice(0, 4).includes(clueStr.toUpperCase())) {
      keyMessageGroup.push({
        key: `[${key[0][0]}, ${key[0][1]}], [${key[1][0]}, ${key[1][1]}]`,
        inverseKey: `[${invKey[0][0]}, ${invKey[0][1]}], [${invKey[1][0]}, ${invKey[1][1]}]`,
        code: str,
        clue: clueStr,
        decodedMsg: decodedMsg,
      });
    }
  }

  // Check if any valid output produced
  if (keyMessageGroup.length < 1) {
    return undefined;
  }

  return keyMessageGroup;
}
