import { createContext } from "react";

const FormContext = createContext({
	loading: false,
	onSubmit: () => {},
	startLoading: () => {},
	stopLoading: () => {},
});

export default FormContext;
