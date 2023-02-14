import Condition from "../Classes/Condition";

const multiCheck = (input, conditions = [Condition]) => {
	let error = "";
	return [
		conditions.reduce((isValid, condition) => {
			const valid = condition.flag(input);
			if (isValid && !valid) error = condition.error;
			return isValid && valid;
		}, true),
		error,
	];
};

export default multiCheck;
