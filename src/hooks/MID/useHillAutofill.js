import { useCallback, useReducer } from "react";
import { useEffect } from "react";

const reducer = (state, action) => {
  if (action.type === "NEW_CODE") {
    return {
      codeHandle: action.value.codeHandle,
      clueHandle: state.clueAutoFill,
      clueInputHandle: state.clueInput,
    };
  } else if (action.type === "NEW_CLUE") {
    return {
      codeHandle: state.codeHandle,
      clueHandle: action.value.clueAutoFill,
      clueInputHandle: state.clueInput,
    };
  } else if (action.type === "NEW_CLUEINPUT") {
    return {
      codeHandle: state.codeHandle,
      clueHandle: state.clueAutoFill,
      clueInputHandle: action.value.clueInput,
    };
  }
  return {
    codeHandle: state.codeHandle,
    clueHandle: state.clueAutoFill,
    clueInputHandle: state.clueInput,
  };
};

const useHillAutofill = (codeAutoFill, clueAutoFill, clueInput) => {
  const [state, dispatch] = useReducer(reducer, {
    codeHandle: codeAutoFill,
    clueHandle: clueAutoFill,
    clueInputHandle: clueInput.value,
  });

  useEffect(() => {
    if (state.codeHandle !== codeAutoFill) {
      dispatch({
        value: {
          codeHandle: codeAutoFill,
        },
        type: "NEW_CODE",
      });
    }
    if (state.clueHandle !== clueAutoFill) {
      dispatch({
        value: {
          clueHandle: clueAutoFill,
        },
        type: "NEW_CLUE",
      });
    }
    if (state.clueInputHandle !== clueInput.value) {
      dispatch({
        value: {
          clueInputHandle: clueInput.value,
        },
        type: "NEW_CLUEINPUT",
      });
    }
  }, [
    codeAutoFill,
    clueAutoFill,
    clueInput.value,
    state.clueHandle,
    state.clueInputHandle,
    state.codeHandle,
  ]);

  const autoFillHandle = useCallback(
    (value) => {
      if (value !== " ") {
        let list = value.split(",");
        list[1] = list[1].split("");
        state.codeHandle(list[0]);
        state.clueHandle(
          state.clueInputHandle.map((x, i) => (list[1][i] ? list[1][i] : ""))
        );
      } else {
        state.codeHandle("");
        state.clueHandle(["", "", "", ""]);
      }
    },
    [state]
  );

  return autoFillHandle;
};

export default useHillAutofill;
