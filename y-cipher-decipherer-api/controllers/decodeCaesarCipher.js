import caesarCipher from "./computecaesarcipher.js";

const decode = (req, res, next) => {
	/* Decodes message encoded with the Caesar Cipher, requires 
     code to be decoded and number of letters shifted as a JSON file */

	// Couple of checks before computing

	if (req.query.shift == null || req.query.code == null || req.query.code < 1) {
		// Check if correct query passed.
		res.status(400).send("Missing Data!").end();
		return;
	}

	if (
		parseInt(req.query.shift.trim()) == null ||
		req.query.code.trim().match(/(\W|\d)/gm) != null
	) {
		// Checks if all characters passed as code are valid andif shift is an integer
		res
			.status(406)
			.send("Invalid characters passed as either clue or code.")
			.end();
		return;
	}

	let code = req.query.code;
	let shift = parseInt(req.query.shift);
	let msg = caesarCipher(code, shift);
	res.json({
		message: msg[0],
		altMessage: msg[1],
		shift: shift,
		code: code,
	});
};

export { decode };
