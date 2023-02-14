import { useReducer } from "react";

import { Condition, multiCheck } from "../../utils";

const reducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		[state.valid, state.error] = multiCheck(action.value, state.conditions);
	} else if (action.type === "AUTO_FILL") {
		state.valid = true;
		state.error = "";
	} else {
		throw new Error(
			`Invalid action called, ${action.type}, change action type or add case`
		);
	}
	return {
		value: action.value,
		conditions: state.conditions,
		valid: state.valid,
		error: state.error,
	};
};

const useInputReducer = (initialValue, conditions = [Condition]) => {
	const [state, dispatch] = useReducer(reducer, {
		value: initialValue,
		conditions: conditions,
		valid: true,
		error: "",
	});

	const userDispatch = (value) => {
		dispatch({ type: "USER_INPUT", value: value });
	};

	const fillDispatch = (value) => {
		dispatch({ type: "AUTO_FILL", value: value });
	};

	return [state, userDispatch, fillDispatch];
};

export default useInputReducer;
