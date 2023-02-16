import { useContext } from "react";

import Choices from "../Choices";
import Form from "../../Containers/Form";
import TextInput from "../../UI/TextInput";
import ClueInput from "../ClueInput";

import FormContext from "../../../hooks/context/FormContext";

const HillForm = () => {
	/* Function containing the form and logic behind the form for the hill cipher
     decoding. */

	const { errorHandles, codeHandle, clueHandle } = useContext(FormContext);
	const { codeState, userDispatchCode } = codeHandle;
	const { clueState, userDispatchClue } = clueHandle;

	// Sets the change to the code input via reducer
	const codeInputChangeHandler = (ev) => {
		userDispatchCode(ev.target.value);
	};

	return (
		<Form>
			<TextInput
				id="code"
				onChange={codeInputChangeHandler}
				value={codeState.value}
				placeholder="Enter coded text"
				errorSource={errorHandles[0]}
			/>
			<ClueInput
				id="clueinpt"
				value={clueState.value}
				dispatchClue={userDispatchClue}
				errorSource={errorHandles[1]}
			/>
			<Choices />
		</Form>
	);
};

export default HillForm;
