import { useContext } from "react";

import TextInput from "../UI/TextInput/TextInput";

import Form from "../UI/Form";
import RailInput from "../RailInput";
import Choices from "../Choices/Choices";

import FormContext from "../../hooks/context/FormContext";

const RailForm = () => {
  const { errorHandles, codeHandle, clueHandle } = useContext(FormContext);
  const { codeState, userDispatchCode } = codeHandle;
  const { clueState, userDispatchClue } = clueHandle;

  // Sets the change to the code input via reducer
  const codeInputChangeHandler = (ev) => {
    userDispatchCode(ev.target.value);
  };

  return (
    <Form>
      <TextInput
        id="code"
        onChange={codeInputChangeHandler}
        value={codeState.value}
        placeholder="Enter coded text"
        errorSource={errorHandles[0]}
      />
      <RailInput
        rails={clueState}
        onChange={userDispatchClue}
        errorSource={errorHandles[1]}
      />
      <Choices />
    </Form>
  );
};

export default RailForm;
