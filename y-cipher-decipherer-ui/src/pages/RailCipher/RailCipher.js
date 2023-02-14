import { useState } from "react";

import RailForm from "../../components/RailForm";
import OutputWindow from "../../components/OutputWindow";

import OutputContext from "../../hooks/context/OutputContext";
import FormContext from "../../hooks/context/FormContext";

import useInputReducer from "../../hooks/reducers/useInputReducer";
import useRails from "../../hooks/high/useRails";
import useErrorHandler from "../../hooks/high/useErrorHandler";

import { RAILENDPOINT, URL } from "../../Constants";
import { greaterThanTwo } from "../../utils";

const formatOutput = (json) => {
	return [{ message: json.message }];
};

const RailCipher = () => {
	const [output, setOutput] = useState(null);

	const [codeState, userDispatchCode, fillDispatchCode] = useInputReducer("", [
		greaterThanTwo,
	]);

	const [railsState, setRails, inputRails] = useRails(2);

	const query = () => {
		return {
			code: codeState.value,
			rails: railsState,
		};
	};

	// States for the Error Messages
	const errorCodeInput = useErrorHandler(
		codeState.valid,
		() => codeState.error
	);

	const fillHandle = (value) => {
		if (value !== " ") {
			const lastIdx = value.lastIndexOf(",");
			let valList = [];
			valList.push(value.slice(0, lastIdx));
			valList.push(value.slice(lastIdx + 1));
			fillDispatchCode(valList[0]);
			setRails(parseInt(valList[1]));
		} else {
			fillDispatchCode("");
			setRails(2);
		}
	};

	return (
		<FormContext.Provider
			value={{
				url: URL,
				endpoint: RAILENDPOINT,
				dataSource: "samplesRail.json",
				query: query,
				fillHandle: fillHandle,
				errorHandles: [errorCodeInput],
				codeHandle: { codeState, userDispatchCode, fillDispatchCode },
				clueHandle: {
					clueState: railsState,
					userDispatchClue: inputRails,
					fillDispatchClue: setRails,
				},
			}}
		>
			<OutputContext.Provider
				value={{
					output: output,
					setOutput: setOutput,
					formatOutput: formatOutput,
				}}
			>
				<h3>Y-Rail Cipher Decipherer</h3>
				<RailForm setOutput={setOutput} />
				<OutputWindow output={output} />
			</OutputContext.Provider>
		</FormContext.Provider>
	);
};

export default RailCipher;
