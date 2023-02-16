import { useState } from "react";

import { URL, HILLENDPOINT } from "../../Constants";

import HillForm from "../../components/Compound/HillForm";
import OutputWindow from "../../components/Containers/OutputWindow";

import FormContext from "../../hooks/context/FormContext";
import OutputContext from "../../hooks/context/OutputContext";

import useErrorHandler from "../../hooks/high/useErrorHandler";
import useInputReducer from "../../hooks/reducers/useInputReducer";

import { greaterThanFour, onlyLetters, emptyOrOnlyLetters } from "../../utils";

const formatOutput = (json) => {
	return json.possibleMessages.map((msg) => {
		return { message: msg.decodedMsg };
	});
};

const HillCipher = ({ hidden = false }) => {
	const [output, setOutput] = useState(null);

	const [clueState, userDispatchClue, fillDispatchClue] = useInputReducer(
		["", "", "", ""],
		[emptyOrOnlyLetters]
	);

	const [codeState, userDispatchCode, fillDispatchCode] = useInputReducer("", [
		greaterThanFour,
		onlyLetters,
	]);

	// States for the Error Messages
	const errorCodeInput = useErrorHandler(
		codeState.valid,
		() => codeState.error
	);

	const errorClueInput = useErrorHandler(
		clueState.valid,
		() => clueState.error
	);

	const fillHandle = (value) => {
		if (value !== " ") {
			let valList = value.split(",");
			valList[1] = valList[1].split("");
			fillDispatchCode(valList[0]);
			fillDispatchClue(
				clueState.value.map((x, i) => (valList[1][i] ? valList[1][i] : ""))
			);
		} else {
			fillDispatchCode("");
			fillDispatchClue(["", "", "", ""]);
		}
	};

	const query = () => {
		return {
			code: codeState.value,
			clue: clueState.value
				.map((element) => (element ? element : "_"))
				.join(""),
		};
	};

	return (
		<FormContext.Provider
			value={{
				url: URL,
				endpoint: HILLENDPOINT,
				dataSource: "samplesHill.json",
				query: query,
				fillHandle: fillHandle,
				errorHandles: [errorCodeInput, errorClueInput],
				codeHandle: { codeState, userDispatchCode, fillDispatchCode },
				clueHandle: { clueState, userDispatchClue, fillDispatchClue },
			}}
		>
			<OutputContext.Provider
				value={{
					output: output,
					setOutput: setOutput,
					formatOutput: formatOutput,
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
