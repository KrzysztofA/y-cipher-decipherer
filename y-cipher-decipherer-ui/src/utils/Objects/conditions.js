import Condition from "../Classes/Condition";

import { ERRORMESSAGES } from "../../Constants";

const greaterThanFour = new Condition((value) => {
  return value.length >= 4;
}, ERRORMESSAGES.MINIMUM_FOUR);

const greaterThanTwo = new Condition((value) => {
  return value.length >= 2;
}, ERRORMESSAGES.MINIMUM_TWO);

const onlyLetters = new Condition((value) => {
  return value.match(/([\d]|[^\w])/m) === null;
}, ERRORMESSAGES.INVALID_CHAR);

const empty = new Condition((value) => value.length === 0);

const emptyOrOnlyLetters = new Condition((value) => {
  return (
    value.every((element) => element.length === 0) ||
    value.every(
      (element) =>
        element.length === 0 || element.match(/([\d]|[^\w])/m) === null
    )
  );
}, ERRORMESSAGES.INVALID_CHAR);

export {
  greaterThanFour,
  greaterThanTwo,
  onlyLetters,
  empty,
  emptyOrOnlyLetters,
};
