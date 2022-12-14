import { useCallback, useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    for (let condition of state.validity) {
      condition.flag = condition.check(action.val);
      if (!condition.flag) state.valid = false;
    }
    return {
      value: action.val,
      valid: state.valid,
      validity: state.validity,
    };
  }
  if (action.type === "AUTO_FILL") {
    state.validity.map((x) => {
      return {
        check: x.check,
        flag: true,
        error: x.error,
      };
    });
    return {
      value: action.val,
      valid: true,
      validity: state.validity,
    };
  }

  throw new Error(
    `Invalid action called, ${action.type}, change action type or add case`
  );
};

/**
 * Hook controlling text input with auto fill
 * @param {*} initialValue - initial value for input field
 * @param {*} validityChecks - array of checking functions and accompanied error messages in form {function: x, error: y}
 * @returns {*} input field state, handle to user input, handle to auto fill input, and error determinant
 */
const useAutoFilledTextInput = (
  initialValue = "",
  validityChecks = [
    {
      function: (x) => x > 0,
      error: "Invalid Input",
    },
  ]
) => {
  const [state, dispatch] = useReducer(reducer, {
    value: initialValue,
    valid: true,
    validity: validityChecks.map((x) => {
      return {
        check: x.function,
        flag: true,
        error: x.error,
      };
    }),
  });

  const userInputHandle = useCallback((value) => {
    dispatch({
      type: "USER_INPUT",
      val: value,
    });
  }, []);

  const autoFillHandle = useCallback((value) => {
    dispatch({
      type: "AUTO_FILL",
      val: value,
    });
  }, []);

  const errorHandle = () => {
    for (let condition of state.validity) {
      if (!condition.flag) return condition.error;
    }
  };

  return [state, userInputHandle, autoFillHandle, errorHandle];
};

export default useAutoFilledTextInput;
