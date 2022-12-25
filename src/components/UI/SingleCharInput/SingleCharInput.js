import React, { useRef, useImperativeHandle } from "react";

import styles from "./SingleCharInput.module.css";

const SingleCharInput = React.forwardRef((props, ref) => {
	const inputRef = useRef(null);

	const focusOn = () => {
		inputRef.current.focus();
	};

	useImperativeHandle(ref, () => {
		return {
			focus: focusOn,
			value: props.value,
		};
	});

	return (
		<input
			className={styles.single}
			type="text"
			ref={inputRef}
			maxLength={1}
			onChange={props.onChange}
			value={props.value}
			id={props.id}
			placeholder={props.placeholder}
		/>
	);
});

export default SingleCharInput;
