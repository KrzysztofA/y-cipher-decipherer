import useAutoFilledTextInput from "../LOW/useAutoFilledTextInput";
import useErrorHandler from "../LOW/useErrorHandler";

import { ERRORS } from "../../Constants";

const useHillCode = () => {
  const [codeInput, codeUserInput, codeAutoFill, codeErrorHandle] =
    useAutoFilledTextInput("", [
      {
        function: (x) => x.match(/([\d]|[^\w])/m) == null,
        error: ERRORS.INVALID_CHAR,
      },
      {
        function: (x) => x.length > 4,
        error: ERRORS.MIN_FOUR,
      },
    ]);

  const codeErrorOutput = useErrorHandler(codeInput.valid, codeErrorHandle);

  return [codeInput, codeUserInput, codeAutoFill, codeErrorOutput];
};

export default useHillCode;
