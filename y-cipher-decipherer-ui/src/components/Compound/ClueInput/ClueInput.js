import { useRef } from "react";

import SingleCharInput from "../../UI/SingleCharInput";

import styles from "./ClueInput.module.css";

const ClueInput = ({ id, dispatchClue, value, errorSource }) => {
	// Refs for clue inputs

	const clue1 = useRef("");
	const clue2 = useRef("");
	const clue3 = useRef("");
	const clue4 = useRef("");

	const clueChange = (ev) => {
		const refs = [clue1, clue2, clue3, clue4];
		const idx = parseInt(ev.target.id.split("#")[1]) - 1;
		dispatchClue(value.map((el, i) => (i === idx ? ev.target.value : el)));
		if (ev.target.value?.length > 0 && idx < 3) {
			refs[idx + 1].current.focus();
		} else if (ev.target.value?.length === 0 && idx > 0) {
			refs[idx - 1].current.focus();
		}
	};

	return (
		<fieldset
			className={styles.lonelySingles}
			aria-label="Clue input - maximum 4 letters"
			id="clue"
			aria-errormessage={`error${id}`}
			aria-invalid={errorSource ? true : false}
		>
			<SingleCharInput
				id="clue#1"
				ref={clue1}
				placeholder="C"
				value={value[0]}
				onChange={clueChange}
				aria-errormessage={`error${id}`}
				aria-invalid={errorSource ? true : false}
			/>
			<SingleCharInput
				id="clue#2"
				ref={clue2}
				placeholder="L"
				value={value[1]}
				onChange={clueChange}
				aria-errormessage={`error${id}`}
				aria-invalid={errorSource ? true : false}
			/>
			<SingleCharInput
				id="clue#3"
				ref={clue3}
				placeholder="U"
				value={value[2]}
				onChange={clueChange}
				aria-errormessage={`error${id}`}
				aria-invalid={errorSource ? true : false}
			/>
			<SingleCharInput
				id="clue#4"
				ref={clue4}
				placeholder="E"
				value={value[3]}
				onChange={clueChange}
				aria-errormessage={`error${id}`}
				aria-invalid={errorSource ? true : false}
			/>
		</fieldset>
	);
};

export default ClueInput;
