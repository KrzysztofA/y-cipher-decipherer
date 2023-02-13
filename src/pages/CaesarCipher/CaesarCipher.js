import { useState } from "react";

import CaesarForm from "../../components/Form/CaesarForm";
import OutputWindow from "../../components/OutputWindow";
import { CAESARENDPOINT, URL } from "../../Constants";

import FormContext from "../../hooks/context/FormContext";
import OutputContext from "../../hooks/context/OutputContext";

import useErrorHandler from "../../hooks/high/useErrorHandler";
import useShift from "../../hooks/high/useShift";
import useInputReducer from "../../hooks/reducers/useInputReducer";
import { empty, onlyLetters } from "../../utils/Objects/conditions";

const formatOutput = (json) => {
  return [{ message: json.message }, { message: json.altMessage }];
};

const CaesarCipher = () => {
  const [output, setOutput] = useState(null);

  const [codeState, userDispatchCode, fillDispatchCode] = useInputReducer("", [
    empty,
    onlyLetters,
  ]);

  const [shiftState, setShift, inputShift] = useShift(1);

  // States for the Error Messages
  const errorCodeInput = useErrorHandler(
    codeState.valid,
    () => codeState.error
  );

  const fillHandle = (value) => {
    if (value !== " ") {
      let valList = value.split(",");
      valList[1] = valList[1].split("");
      fillDispatchCode(valList[0]);
      setShift(parseInt(valList[1]));
    } else {
      fillDispatchCode("");
      setShift(1);
    }
  };

  const query = () => {
    return {
      code: codeState.value,
      shift: shiftState,
    };
  };

  return (
    <FormContext.Provider
      value={{
        url: URL,
        endpoint: CAESARENDPOINT,
        dataSource: "samplesCaesar.json",
        query: query,
        fillHandle: fillHandle,
        errorHandles: [errorCodeInput],
        codeHandle: { codeState, userDispatchCode, fillDispatchCode },
        clueHandle: {
          clueState: shiftState,
          userDispatchClue: inputShift,
          fillDispatchClue: setShift,
        },
      }}
    >
      <OutputContext.Provider
        value={{
          output: output,
          setOutput: setOutput,
          formatOutput: formatOutput,
        }}
      >
        <h3>Y-Caesar Cipher Decipherer</h3>
        <CaesarForm setOutput={setOutput} />
        <OutputWindow output={output} />
      </OutputContext.Provider>
    </FormContext.Provider>
  );
};

export default CaesarCipher;
