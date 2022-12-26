import { useCallback, useState } from "react";

import { URL, HILLENDPOINT } from "../../Constants";

import HillForm from "../../components/Form/HillForm";
import OutputWindow from "../../components/OutputWindow";

import FormContext from "../../hooks/context/FormContext";
import OutputContext from "../../hooks/context/OutputContext";
import useLoading from "../../hooks/low/useLoading";

const outputFormat = (json) => {
	return json.possibleMessages.map((msg) => {
		return { message: msg.decodedMsg };
	});
};

const HillCipher = () => {
	const [loading, startLoading, stopLoading] = useLoading();
	const [output, setOutput] = useState(null);

	return (
		<FormContext.Provider
			value={{
				url: URL,
				endpoint: HILLENDPOINT,
				dataSource: "samplesHill.json",
				loading: loading,
				startLoading: startLoading,
				stopLoading: stopLoading,
			}}
		>
			<OutputContext.Provider
				value={{
					output: output,
					setOutput: setOutput,
					outputFormat: outputFormat,
				}}
			>
				<h3>Y-Hill Cipher Decipherer</h3>
				<HillForm />
				<OutputWindow />
			</OutputContext.Provider>
		</FormContext.Provider>
	);
};

export default HillCipher;
