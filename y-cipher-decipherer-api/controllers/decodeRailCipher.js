import railcipher from "./computerailcipher.js";

const decode = (req, res, next) => {
	/* Function decoding message encoded with rail cipher. Takes
     number of rails used to encode and coded message. Returns JSON
     combining message, number of rails and coded message */

	// Couple of checks before computing

	if (req.query.rails == null || req.query.code == null || req.query.code < 2) {
		// Check if correct query passed.
		res.status(400).send("Missing Data!").end();
		return;
	}

	if (parseInt(req.query.rails.trim()) == null) {
		// Checks if number of rails is an integer
		res
			.status(406)
			.send("Invalid characters passed as either clue or code.")
			.end();
		return;
	}

	let code = req.query.code;
	let rails = parseInt(req.query.rails);
	let msg = railcipher(code, rails);

	res.json({
		message: msg,
		rails: rails,
		code: code,
	});
};

export { decode };
