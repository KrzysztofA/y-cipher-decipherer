import { useState } from "react";

const useErrorText = (initialText = "") => {
	const [errorText, setErrorText] = useState(initialText);

	const errorSetHandler = (val) => {
		setErrorText(val);
	};

	const errorResetHandler = () => {
		setErrorText(initialText);
	};

	return [errorText, errorSetHandler, errorResetHandler];
};

export default useErrorText;
