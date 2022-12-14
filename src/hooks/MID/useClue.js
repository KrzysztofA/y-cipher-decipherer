import useAutoFilledTextInput from "../LOW/useAutoFilledTextInput";
import useErrorHandler from "../LOW/useErrorHandler";

import { ERRORS } from "../../Constants";

const useClue = () => {
  const [clueInput, clueUserInput, clueAutoFill, clueErrorHandle] =
    useAutoFilledTextInput(
      ["", "", "", ""],
      [
        {
          function: (x) => {
            return x.some((y) => y.length > 0);
          },
          error: ERRORS.INVALID_CHAR,
        },
        {
          function: (x) => {
            return (
              x.some((el) => el?.match(/([\d]|[^\w])/m) == null) &&
              x.every((el) => el.length !== 0)
            );
          },
          error: ERRORS.INVALID_CHAR,
        },
      ]
    );

  const clueErrorOutput = useErrorHandler(clueInput.valid, clueErrorHandle);

  return [clueInput, clueUserInput, clueAutoFill, clueErrorOutput];
};

export default useClue;
