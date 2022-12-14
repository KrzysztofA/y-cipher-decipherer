import useInputValue from "../LOW/useInputValue";

const useShift = () => {
  const [shift, shiftSetHandler, shiftInputHandler] = useInputValue();

  return [shift, shiftSetHandler, shiftInputHandler];
};

export default useShift;
