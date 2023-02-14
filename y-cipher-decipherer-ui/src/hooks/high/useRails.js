import useNumericInput from "../low/useNumericInput";

const useRails = (val = 2) => {
  const [rails, setRails, inputRails] = useNumericInput(val);

  return [rails, setRails, inputRails];
};

export default useRails;
