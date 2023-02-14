import { createContext } from "react";

const OutputContext = createContext({
	output: [],
	setOutput: () => {},
	formatOutput: () => {},
});

export default OutputContext;
