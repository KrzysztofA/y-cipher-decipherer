import { useState, useEffect, useReducer } from "react";

import TextInput from "../UI/TextInput/TextInput";
import AutoFill from "../AutoFill/AutoFill";
import Submit from "../UI/SubmitButton/Submit";

import { URL, ERROSMESSAGES, RAILENDPOINT } from "../../Constants";

import styles from "./Form.module.css";
import LoadingModal from "../UI/LoadingPortal";
import useFetch from "../../hooks/low/useFetch";

const codeReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return {
			value: action.val,
			isValid: action.val.length > 2,
		};
	} else if (action.type === "AUTO_FILL") {
		return {
			value: action.val,
			isValid: true,
		};
	}
	return {
		value: "",
		isValid: true,
	};
};

const RailForm = (props) => {
	// Default amount of rails
	const [rails, setRails] = useState(1);

	// Error states
	const [codeError, setCodeError] = useState("");
	const [submitError, setSubmitError] = useState("");

	// Loading state
	const [loading, setLoading] = useState(false);

	// Code handling reducer
	const [codeState, dispatchCode] = useReducer(codeReducer, {
		value: "",
		isValid: true,
	});

	// Code input validator
	useEffect(() => {
		const codeTimeout = setTimeout(() => {
			if (!codeState.isValid) {
				setCodeError(ERROSMESSAGES.MINIMUM_TWO);
			} else {
				setCodeError("");
			}
		}, 500);
		return () => {
			clearTimeout(codeTimeout);
		};
	}, [codeState.isValid]);

	// Code change handler
	const codeChangeHandler = (ev) => {
		dispatchCode({
			type: "USER_INPUT",
			val: ev.target.value,
		});
	};

	// Rails amount change handler
	const railsChangeHandler = (ev) => {
		setRails(ev.target.value);
	};

	// Handler of behaviour when autofilled value used
	const fillChangeHandler = (value) => {
		if (value !== " ") {
			const lastIdx = value.lastIndexOf(",");
			let valList = [];
			valList.push(value.slice(0, lastIdx));
			valList.push(value.slice(lastIdx + 1));
			dispatchCode({
				type: "AUTO_FILL",
				val: valList[0],
			});
			setRails(parseInt(valList[1]));
		} else {
			dispatchCode({
				type: "AUTO_FILL",
				val: "",
			});
			setRails(parseInt(2));
		}
	};

	const handleFetch = useFetch(URL, RAILENDPOINT);

	const submitCaesarHandler = (ev) => {
		ev.preventDefault();
		if (!codeState.isValid) {
			setSubmitError(ERROSMESSAGES.SUBMIT);
			return;
		}
		setSubmitError("");
		setLoading(true);
		const query = {
			code: codeState.value,
			rails: rails,
		};
		handleFetch(query)
			.then((res) => {
				if (res.status !== 200) throw new Error(res.statusText);
				return res.json();
			})
			.then((json) => {
				props.setOutput([{ message: json.message }]);
			})
			.catch((err) => {
				setSubmitError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			{loading && <LoadingModal />}
			<form onSubmit={submitCaesarHandler}>
				<ul className={styles.formList}>
					<li className={styles.codeInput}>
						<TextInput
							id="code"
							onChange={codeChangeHandler}
							value={codeState.value}
							placeholder="Enter coded text"
						/>
						<div className={styles.errorMessage}>{codeError}</div>
					</li>
					<li className={styles.numberInput}>
						<label htmlFor="rails">No. of Rails: </label>
						<input
							type="number"
							min="2"
							max="9999"
							value={rails}
							id="rails"
							onChange={railsChangeHandler}
						/>
					</li>
					<li className={styles.choices}>
						<AutoFill
							dataSource="./samplesRail.json"
							changeHandler={fillChangeHandler}
						/>
						<Submit />
					</li>
					<div className={styles.errorMessage}>{submitError}</div>
				</ul>
			</form>
		</>
	);
};

export default RailForm;
