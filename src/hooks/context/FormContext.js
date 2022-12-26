import { createContext } from "react";

const FormContext = createContext({
	url: "",
	endpoint: "",
	dataSource: "",
	loading: false,
	query: () => {},
	onSubmit: () => {},
	startLoading: () => {},
	stopLoading: () => {},
});

export default FormContext;
