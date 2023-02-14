import { numbersListToString, stringToNumbersList } from "./utils.js";

const wrapInt = (num, maxNum) => {
	/* Function wrapping numbers if they reach max number */

	return num < maxNum ? num : wrapInt(num - maxNum, maxNum);
};

export default function caesarCipher(str, shift) {
	/* Function containing logic behind caesar cipher, returns string with letters
     shifted by the shift value and then wrapped within 26 characters of the english 
     alphabet */

	return [
		numbersListToString(
			stringToNumbersList(str).map((x) => wrapInt(x + shift, 26))
		),
		numbersListToString(
			stringToNumbersList(str).map((x) => wrapInt(x - shift, 26))
		),
	];
}
