import useNumericInput from "../low/useNumericInput";

const useShift = () => {
  const [shift, setShift, inputShift] = useNumericInput(1);

  return [shift, setShift, inputShift];
};

export default useShift;
