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
	errorHandles: [],
	fillHandle: () => {},
	codeHandle: {
		codeState: null,
		userDispatchCode: null,
		fillDispatchCode: null,
	},
	clueHandle: {
		clueState: null,
		userDispatchClue: null,
		fillDispatchClue: null,
	},
});

export default FormContext;
