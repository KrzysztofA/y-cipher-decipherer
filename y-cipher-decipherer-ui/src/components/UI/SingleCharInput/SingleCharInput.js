import React, { useRef, useImperativeHandle } from "react";

import styles from "./SingleCharInput.module.css";

const SingleCharInput = React.forwardRef(
	(
		{ id, value, onChange, placeholder, ariaErrormessage, ariaInvalid },
		ref
	) => {
		const inputRef = useRef(null);

		const focusOn = () => {
			inputRef.current.focus();
		};

		useImperativeHandle(ref, () => {
			return {
				focus: focusOn,
				value: value,
			};
		});

		return (
			<input
				className={styles.single}
				type="text"
				ref={inputRef}
				maxLength={1}
				onChange={onChange}
				value={value}
				id={id}
				placeholder={placeholder}
				aria-describedby="clue"
				aria-errormessage={ariaErrormessage}
				aria-invalid={ariaInvalid}
			/>
		);
	}
);

export default SingleCharInput;
