import { createContext } from "react";

const FormContext = createContext({
	url: "",
	endpoint: "",
	query: () => {},
	loading: false,
	onSubmit: () => {},
	startLoading: () => {},
	stopLoading: () => {},
});

export default FormContext;
