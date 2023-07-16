import hillcipher from "./computehillcipher.js";
import { stringToNumbersList, numbersListToString } from "./utils.js";

const decode = async (req, res, next) => {
  /* Decodes message encoded with a Hill Cipher, sends response with JSON code containing
     list of potential original messages, clue used to compute this message and encoded 
     message back */

  // Check for validity of the request

  if (req.query.clue == null || req.query.code == null || req.query.code < 4) {
    // Check if correct query passed. Note that when clue is missing, should pass '____' instead of null
    res.status(400).send("Missing Data!").end();
    return;
  }

  if (
    req.query.clue.trim().match(/(\W|\d)/gm) != null ||
    req.query.code.trim().match(/(\W|\d)/gm) != null
  ) {
    // Checks if all characters passed as clue are valid
    res
      .status(406)
      .send("Invalid characters passed as either clue or code.")
      .end();
    return;
  }

  let msgs = [];

  if (!req.query.clue.trim().includes("_")) {
    // Check if full clue provided - 4 characters, if so check if the clue is valid
    // by solving for the key, computing determinant and checking whether it is a coprime of 26
    msgs = await hillcipher(req.query.code, req.query.clue);
    if (msgs == null) {
      // If not coprime of 26 return 406 - not acceptable, with appropriate error message
      res
        .status(406)
        .send(
          "Invalid clue provided, no possible determinant of any key formed!"
        )
        .end();
      return;
    }

    // Scenario 1 - await execution of single hill cipher because whole clue was provided
    res.json({
      possibleMessages: [...msgs],
    });
  } else {
    // Compute all clues' variations by substituting each missing letter with letters from a to z

    let code = req.query.code; // Required
    let clueBase = stringToNumbersList(req.query.clue); // Optional
    let clueList = [];

    let min1, max1, min2, max2, min3, max3, min4, max4;
    min1 = clueBase[0] === "_" ? 0 : clueBase[0];
    max1 = clueBase[0] === "_" ? 25 : clueBase[0];
    min2 = clueBase[1] === "_" ? 0 : clueBase[1];
    max2 = clueBase[1] === "_" ? 25 : clueBase[1];
    min3 = clueBase[2] === "_" ? 0 : clueBase[2];
    max3 = clueBase[2] === "_" ? 25 : clueBase[2];
    min4 = clueBase[3] === "_" ? 0 : clueBase[3];
    max4 = clueBase[3] === "_" ? 25 : clueBase[3];

    // This is very nasty and very long sequence of computing all valid letters for the clue by substituting
    // missing letters with numbers from 0 to 25

    for (let i1 = min1; i1 <= max1; i1++) {
      for (let i2 = min2; i2 <= max2; i2++) {
        for (let i3 = min3; i3 <= max3; i3++) {
          for (let i4 = min4; i4 <= max4; i4++) {
            clueList.push([i1, i2, i3, i4]);
          }
        }
      }
    }

    clueList = clueList.map((x) => numbersListToString(x));

    // Now for any missing value in a clue letters from 0 to 25 were substituted, hill cipher can be computed
    // Code is anynchronous to be able to compute many many clues at the same time in a timely manner
    const computingQuery = async (msgs) => {
      for await (const i of clueList) {
        hillcipher(code, i).then((temp) => {
          // If unique and not null append to msgs
          if (temp != null && !msgs.includes(temp)) {
            msgs.push(...temp);
          }
        });
      }
    };

    // Scenario 2 - Compute all possible clues and await for execution of each function, then return json

    // Finally return computed valid code-msg-key-clue list of tuples to the user
    computingQuery(msgs).then(() => {
      return res.json({
        possibleMessages: [...msgs],
      });
    });
  }
};

export { decode };
