export default function railcipher(code, rails) {
	/* Function containing logic behind decoding rail cipher. */

	const len = code.length;

	const railList = [...Array(rails)].map((el) => 0);

	// Had some problem wrapping around the maths that would conclude it in a way that would match every case
	// Since the problem is trivial and even introducing extra for loop won't matter for overall performance
	for (let i = 0, rail = 0, dir = 1; i < len; i++, rail += dir) {
		railList[rail]++;
		if ((rail === 0 && i !== 0) || rail === railList.length - 1) {
			dir *= -1;
		}
	}

	// Now using values obtained before, map the function into new array of arrays of characters
	let idx = 0;
	const railSpread = [...Array(rails)].map((el, i) => {
		let a = code.slice(idx, idx + railList[i]);
		idx += railList[i];
		return a;
	});

	// Finally using values obtained and railed arrays compute final message by tranversing the rails once again
	let msg = "";
	for (
		let i = 0, rail = 0, dir = 1, idx = 0, idxf = 0;
		i < len;
		i++, rail += dir
	) {
		if (rail === 0 || rail === railList.length - 1) {
			msg += railSpread[rail][idxf];
		} else {
			msg += railSpread[rail][idx];
		}

		if ((rail === 0 && i !== 0) || rail === railList.length - 1) {
			dir *= -1;
			idx++;
			if (rail === railList.length - 1) {
				idxf++;
			}
		}
	}

	return msg;
}
