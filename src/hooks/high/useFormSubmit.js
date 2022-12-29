import { useContext } from "react";

import useErrorText from "../low/useErrorText";
import useFetch from "../low/useFetch";

import FormContext from "../context/FormContext";
import OutputContext from "../context/OutputContext";

import { ERRORMESSAGES } from "../../Constants";

const useFormSubmit = (condition, startLoading, stopLoading) => {
	// Contexts
	const { url, endpoint, query } = useContext(FormContext);
	const { setOutput, formatOutput } = useContext(OutputContext);

	// Hooks
	const [error, setError, resetError] = useErrorText();
	const handleFetch = useFetch(url, endpoint);

	const submitHandler = (event) => {
		event.preventDefault();
		if (!condition) {
			setError(ERRORMESSAGES.SUBMIT);
			return;
		}
		startLoading();
		resetError();
		handleFetch(query())
			.then((res) => {
				if (!res.ok) throw new Error(res.statusText);
				return res.json();
			})
			.then((json) => {
				setOutput(formatOutput(json));
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				stopLoading();
			});
	};

	return [submitHandler, error];
};

export default useFormSubmit;
