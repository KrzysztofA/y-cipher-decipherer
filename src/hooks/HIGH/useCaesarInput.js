import useCaesarAutofill from "../MID/useCaesarAutofill";
import useCaesarCode from "../MID/useCaesarCode";
import useCaesarSubmit from "../MID/useCaesarSubmit";
import useShift from "../MID/useShift";

const useCaesarInput = () => {
  const [codeInput, codeUserInput, codeAutoFill, codeErrorOutput] =
    useCaesarCode();

  const [shift, shiftSetHandler, shiftChangeHandler] = useShift();

  const autoFillHandle = useCaesarAutofill(codeAutoFill, shiftSetHandler);

  const [submit, fetchData, fetchLoading, submitError] = useCaesarSubmit(
    codeInput,
    shift
  );

  return [
    { data: codeInput, input: codeUserInput, error: codeErrorOutput },
    { data: shift, input: shiftChangeHandler },
    {
      call: submit,
      data: fetchData,
      loading: fetchLoading,
      error: submitError,
    },
    autoFillHandle,
  ];
};

export default useCaesarInput;
