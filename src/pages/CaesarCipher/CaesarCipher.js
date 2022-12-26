import { useState } from "react";

import CaesarForm from "../../components/Form/CaesarForm";
import OutputWindow from "../../components/OutputWindow";

const CaesarCipher = () => {
	const [output, setOutput] = useState(null);

	return (
		<>
			<h3>Y-Caesar Cipher Decipherer</h3>
			<CaesarForm setOutput={setOutput} />
			<OutputWindow output={output} />
		</>
	);
};

export default CaesarCipher;
