import useSubmit from "../LOW/useSubmit";

import { URL, CAESARENDPOINT } from "../../Constants";

const useCaesarSubmit = (codeInput, shiftInput) => {
  const [submit, fetchData, fetchLoading, submitError] = useSubmit(
    URL,
    CAESARENDPOINT,
    () => {
      return {
        code: codeInput.value,
        shift: shiftInput,
      };
    },
    () => {
      return codeInput.valid;
    }
  );

  return [submit, fetchData, fetchLoading, submitError];
};

export default useCaesarSubmit;
