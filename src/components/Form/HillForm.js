import { useContext } from "react";

import styles from "./Form.module.css";

import FormContext from "../../hooks/context/FormContext";

import ClueInput from "../ClueInput/ClueInput";
import Submit from "../UI/SubmitButton/Submit";
import TextInput from "../UI/TextInput/TextInput";
import AutoFill from "../AutoFill/AutoFill";
import LoadingModal from "../UI/LoadingPortal";
import Form from "../UI/Form";

import { greaterThanFour, onlyLetters, emptyOrOnlyLetters } from "../../utils";

import useFormSubmit from "../../hooks/high/useFormSubmit";
import useInputReducer from "../../hooks/reducers/useInputReducer";
import useErrorHandler from "../../hooks/high/useErrorHandler";

export default function HillForm(props) {
	/* Function containing the form and logic behind the form for the hill cipher
     decoding. */

	const { loading } = useContext(FormContext);

	// Reducer for the code input and clue input
	const [clueState, userDispatchClue, fillDispatchClue] = useInputReducer(
		["", "", "", ""],
		[emptyOrOnlyLetters]
	);

	/* Function containing coded text input logic, validates whether code has 
     more than 4 characters and contains only valid letters */

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

	const query = {
		code: codeState.value,
		clue: clueState.value.map((element) => (element ? element : "_")).join(""),
	};
	// Sets the change to the code input via reducer
	const codeInputChangeHandler = (ev) => {
		userDispatchCode(ev.target.value);
	};

	// Called when code and clue are autofilled with an example
	const autoFillHandler = (value) => {
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

	// On Submits calls the back end to compute hill cipher based on code and clue provided
	const [submitHandler, submitError] = useFormSubmit(
		() => codeState.valid && clueState.isValid
	);

	return (
		<>
			{loading && <LoadingModal />}
			<form onSubmit={submitHandler}>
				<ul className={styles.formList}>
					<li>
						<TextInput
							id="code"
							onChange={codeInputChangeHandler}
							value={codeState.value}
							placeholder="Enter coded text"
						/>
						<div className={styles.errorMessage}>{errorCodeInput}</div>
					</li>
					<li>
						<ClueInput
							value={clueState.value}
							dispatchClue={userDispatchClue}
						/>
					</li>
					<div className={styles.errorMessage}>{errorClueInput}</div>
					<li>
						<AutoFill changeHandler={autoFillHandler} />
						<Submit />
					</li>
					<div className={styles.errorMessage}>{submitError}</div>
				</ul>
			</form>
		</>
	);
}
