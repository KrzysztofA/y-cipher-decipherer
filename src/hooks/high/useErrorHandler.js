import { useEffect } from "react";

import useErrorText from "../low/useErrorText";

const useErrorHandler = (
	condition,
	errorTextDeterminant = () => "Error",
	initialText = ""
) => {
	const [text, setText, resetText] = useErrorText(initialText);

	// Effect handling code error display. After change input reevaluates 0.5 sec timer checking if the input is valid.

	useEffect(() => {
		const errorTimeout = setTimeout(() => {
			if (!condition) {
				setText(errorTextDeterminant());
			} else {
				resetText();
			}
		}, 500);
		return () => {
			clearTimeout(errorTimeout);
		};
	}, [condition, errorTextDeterminant, setText, resetText]);

	return text;
};

export default useErrorHandler;
