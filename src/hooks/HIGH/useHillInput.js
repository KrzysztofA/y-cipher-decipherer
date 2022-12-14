import { useCallback } from "react";
import useClue from "../MID/useClue";
import useHillAutofill from "../MID/useHillAutofill";
import useHillCode from "../MID/useHillCode";
import useHillSubmit from "../MID/useHillSubmit";

const useHillInput = () => {
  const [codeInput, codeUserInput, codeAutoFill, codeErrorOutput] =
    useHillCode();
  const [clueInput, clueUserInput, clueAutoFill, clueErrorOutput] = useClue();

  const autoFillChangeHandle = useHillAutofill(
    codeAutoFill,
    clueAutoFill,
    clueInput
  );

  const [submit, fetchData, fetchLoading, submitError] = useHillSubmit(
    codeInput,
    clueInput
  );

  return [
    { data: codeInput, input: codeUserInput, error: codeErrorOutput },
    { data: clueInput, input: clueUserInput, error: clueErrorOutput },
    {
      call: submit,
      data: fetchData,
      loading: fetchLoading,
      error: submitError,
    },
    useCallback((value) => autoFillChangeHandle(value), [autoFillChangeHandle]),
  ];
};

export default useHillInput;
