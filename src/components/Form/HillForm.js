import React, { useState, useEffect, useReducer } from "react";

import ClueInput from "../ClueInput/ClueInput";
import Submit from "../UI/SubmitButton/Submit";
import TextInput from "../UI/TextInput/TextInput";
import AutoFill from "../AutoFill/AutoFill";

import { URL, HILLENDPOINT, ERROSMESSAGES } from "../../Constants";

import styles from "./Form.module.css";
import LoadingModal from "../UI/LoadingPortal";
import useFetch from "../../hooks/low/useFetch";

const codeReducer = (state, action) => {
	/* Function containing coded text input logic, validates whether code has 
     more than 4 characters and contains only valid letters */

	// Validates on user input
	if (action.type === "USER_INPUT") {
		const checkFour = action.val.length < 4;
		const checkValidIpt = action.val.match(/([\d]|[^\w])/m) != null;
		const checkValid = !checkValidIpt && !checkFour;
		return {
			value: action.val,
			fourMore: checkFour,
			nonValidIpt: checkValidIpt,
			isValid: checkValid,
		};
	}
	// Doesn't have to validate on auto fill
	else if (action.type === "AUTO_FILL") {
		return {
			value: action.val,
			fourMore: false,
			nonValidIpt: false,
			isValid: true,
		};
	}
	// Default values
	return {
		value: "",
		fourMore: true,
		nonValidIpt: false,
		isValid: true,
	};
};

const clueReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return {
			value: action.val,
			isValid:
				(action.val.some((el) => el.length > 0) &&
					!action.val.some((el) => el?.match(/([\d]|[^\w])/m) != null)) ||
				action.val.every((el) => el.length === 0),
		};
	} else if (action.type === "AUTO_FILL") {
		return {
			value: action.val,
			isValid: true,
		};
	}
	// Default Values
	return {
		value: ["", "", "", ""],
		isValid: true,
	};
};

export default function HillForm(props) {
	/* Function containing the form and logic behind the form for the hill cipher
     decoding. */

	// States for the Error Messages
	const [errorTextInput, setErrorTextInput] = useState("");
	const [errorClueInput, setErrorClueInput] = useState("");
	const [errorSubmit, setErrorSubmit] = useState("");

	// Loading state
	const [loading, setLoading] = useState(false);

	// Reducer for the code input and clue input
	const [clueState, dispatchClue] = useReducer(clueReducer, {
		value: ["", "", "", ""],
		isValid: true,
	});
	const [codeState, dispatchCode] = useReducer(codeReducer, {
		value: "",
		isValid: true,
		fourMore: true,
		nonValidIpt: false,
	});

	// Effect handling clue error display. After keypress waits 0.5 sec and then if invalid input displays it in error
	useEffect(() => {
		const clueTimeout = setTimeout(() => {
			setErrorClueInput(clueState.isValid ? "" : ERROSMESSAGES.InvalidChar);
		}, 500);
		return () => {
			clearTimeout(clueTimeout);
		};
	}, [clueState.isValid]);

	// Effect handling code error display. After change input reevaluates 0.5 sec timer checking if the input is valid.
	useEffect(() => {
		const codeTimeout = setTimeout(() => {
			if (!codeState.isValid) {
				setErrorTextInput(
					codeState.fourMore ? ERROSMESSAGES.MinFour : ERROSMESSAGES.InvalidChar
				);
			} else {
				setErrorTextInput("");
			}
		}, 500);
		return () => {
			clearTimeout(codeTimeout);
		};
	}, [codeState.isValid, codeState.fourMore]);

	// Sets the change to the code input via reducer
	const codeInputChangeHandler = (ev) => {
		dispatchCode({
			type: "USER_INPUT",
			val: ev.target.value,
		});
	};

	// Called when code and clue are autofilled with an example
	const fillChangeHandler = (value) => {
		if (value !== " ") {
			let valList = value.split(",");
			valList[1] = valList[1].split("");
			dispatchCode({
				type: "AUTO_FILL",
				val: valList[0],
			});
			dispatchClue({
				type: "AUTO_FILL",
				val: clueState.value.map((x, i) =>
					valList[1][i] ? valList[1][i] : ""
				),
			});
		} else {
			dispatchCode({
				type: "AUTO_FILL",
				val: "",
			});
			dispatchClue({
				type: "AUTO_FILL",
				val: ["", "", "", ""],
			});
		}
	};

	const handleFetch = useFetch(URL, HILLENDPOINT);

	// On Submits calls the back end to compute hill cipher based on code and clue provided
	const submitHillHandler = (ev) => {
		ev.preventDefault();
		if (!codeState.isValid || !clueState.isValid) {
			setErrorSubmit(ERROSMESSAGES.SUBMIT);
			return;
		}
		setErrorSubmit("");
		setLoading(true);
		const query = {
			code: codeState.value,
			clue: clueState.value.map((el) => (el ? el : "_")).join(""),
		};
		handleFetch(query)
			.then((res) => {
				if (res.status !== 200) throw new Error(res.statusText);
				return res.json();
			})
			.then((json) => {
				props.setOutput(json.possibleMessages);
			})
			.catch((err) => {
				setErrorSubmit(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			{loading && <LoadingModal />}
			<form onSubmit={submitHillHandler}>
				<ul className={styles.formList}>
					<li className={styles.codeInput}>
						<TextInput
							id="code"
							onChange={codeInputChangeHandler}
							value={codeState.value}
							placeholder="Enter coded text"
						/>
						<div className={styles.errorMessage}>{errorTextInput}</div>
					</li>
					<li>
						<ClueInput
							value={clueState.value}
							dispatchClue={dispatchClue}
						/>
					</li>
					<div className={styles.errorMessage}>{errorClueInput}</div>
					<li className={styles.choices}>
						<AutoFill
							dataSource="./samplesHill.json"
							changeHandler={fillChangeHandler}
						/>
						<Submit />
					</li>
					<div className={styles.errorMessage}>{errorSubmit}</div>
				</ul>
			</form>
		</>
	);
}
