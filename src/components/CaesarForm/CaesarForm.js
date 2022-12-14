import { useMemo, useCallback } from "react";

import ShiftInput from "../ShiftInput";
import CodeInput from "../UI/CodeInput";
import Choices from "../Choices";
import Form from "../UI/Form";

import useCaesarInput from "../../hooks/HIGH/useCaesarInput";
import useLaterEffect from "../../hooks/LOW/useLaterEffect";

const CaesarForm = ({ setOutput }) => {
  const [code, shift, submit, autoFill] = useCaesarInput();

  const data = useMemo(() => submit.data, [submit.data]);
  const outputHandle = useCallback(
    () =>
      setOutput([{ message: data.message }, { altMessage: data.altMessage }]),
    [setOutput, data.message, data.altMessage]
  );

  useLaterEffect(() => {
    outputHandle();
  }, [data, outputHandle]);

  const shiftChangeHandle = (ev) => {
    shift.input(ev.target.value);
  };

  const onInputChange = (ev) => {
    code.input(ev.target.value);
  };

  return (
    <Form onSubmit={submit.call} loading={submit.loading} id="CaesarForm">
      <CodeInput
        id="codeCaesar"
        onChange={onInputChange}
        value={code.data.value}
        placeholder="Enter coded text"
        error
        errorSource={code.error}
      />
      <ShiftInput
        id="shiftCaesar"
        shift={shift.data}
        onChange={shiftChangeHandle}
      />
      <Choices
        id="choicesCaesar"
        dataSource="samplesCaesar.json"
        changeHandler={useCallback((option) => autoFill(option), [autoFill])}
        error
        errorSource={submit.error}
      />
    </Form>
  );
};

export default CaesarForm;
