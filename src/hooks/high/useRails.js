import useNumericInput from "../low/useNumericInput";

const useRails = () => {
	const [rails, setRails, inputRails] = useNumericInput(1);

	return [rails, setRails, inputRails];
};

export default useRails;
