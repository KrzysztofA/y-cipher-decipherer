import { useState } from "react";

import HillForm from "../../components/Form/HillForm";
import OutputWindow from "../../components/OutputWindow";

import FormContext from "../../hooks/context/FormContext";
import useLoading from "../../hooks/low/useLoading";

const HillCipher = () => {
	const [loading, startLoading, stopLoading] = useLoading();
	const [output, setOutput] = useState(null);

	return (
		<FormContext.Provider
			value={{
				loading: loading,
				startLoading: startLoading,
				stopLoading: stopLoading,
			}}
		>
			<h3>Y-Hill Cipher Decipherer</h3>
			<HillForm setOutput={setOutput} />
			<OutputWindow output={output} />
		</FormContext.Provider>
	);
};

export default HillCipher;
