import { useRef } from "react";

import SingleCharInput from "../UI/SingleCharInput/SingleCharInput";

import styles from "./ClueInput.module.css";

export default function ClueInput(props) {
	// Refs for clue inputs

	const clue1 = useRef("");
	const clue2 = useRef("");
	const clue3 = useRef("");
	const clue4 = useRef("");

	const clueChange = (ev) => {
		const refs = [clue1, clue2, clue3, clue4];
		const idx = parseInt(ev.target.id.split("#")[1]) - 1;
		props.dispatchClue(
			props.value.map((el, i) => (i === idx ? ev.target.value : el))
		);
		if (ev.target.value?.length > 0 && idx < 3) {
			refs[idx + 1].current.focus();
		} else if (ev.target.value?.length === 0 && idx > 0) {
			refs[idx - 1].current.focus();
		}
	};

	return (
		<div className={styles.lonelySingles}>
			<SingleCharInput
				id="clue#1"
				ref={clue1}
				placeholder="C"
				value={props.value[0]}
				onChange={clueChange}
			/>
			<SingleCharInput
				id="clue#2"
				ref={clue2}
				placeholder="L"
				value={props.value[1]}
				onChange={clueChange}
			/>
			<SingleCharInput
				id="clue#3"
				ref={clue3}
				placeholder="U"
				value={props.value[2]}
				onChange={clueChange}
			/>
			<SingleCharInput
				id="clue#4"
				ref={clue4}
				placeholder="E"
				value={props.value[3]}
				onChange={clueChange}
			/>
		</div>
	);
}
