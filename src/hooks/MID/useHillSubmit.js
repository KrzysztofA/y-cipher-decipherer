import useSubmit from "../LOW/useSubmit";

import { URL, HILLENDPOINT } from "../../Constants";

const useHillSubmit = (codeInput, clueInput) => {
  const [submit, fetchData, fetchLoading, submitError] = useSubmit(
    URL,
    HILLENDPOINT,
    () => {
      return {
        code: codeInput.value,
        clue: clueInput.value.map((el) => (el ? el : "_")).join(""),
      };
    },
    () => {
      return codeInput.valid && clueInput.valid;
    }
  );
  return [submit, fetchData, fetchLoading, submitError];
};

export default useHillSubmit;
