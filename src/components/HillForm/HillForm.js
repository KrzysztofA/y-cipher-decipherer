import { useCallback, useMemo } from "react";

import Form from "../UI/Form";
import Choices from "../Choices";
import ClueInput from "../ClueInput";
import CodeInput from "../UI/CodeInput";

import useHillInput from "../../hooks/HIGH/useHillInput";
import useLaterEffect from "../../hooks/LOW/useLaterEffect";

const HillForm = ({ setOutput }) => {
  const [code, clue, submit, autoFill] = useHillInput();

  useLaterEffect(() => {
    setOutput(submit.data.possibleMessages);
  }, [submit.data, setOutput]);

  return (
    <Form onSubmit={submit.call} loading={submit.loading} id="HillForm">
      <CodeInput
        id="codeHill"
        onChange={useCallback(
          (ev) => {
            code.input(ev.target.value);
          },
          [code]
        )}
        value={useMemo(() => code.data.value, [code])}
        placeholder="Enter coded text"
        error
        errorSource={useMemo(() => code.error, [code])}
      />
      <ClueInput
        value={clue.data.value}
        id="clueHill"
        dispatchClue={clue.input}
        error
        errorSource={clue.error}
      />
      <Choices
        dataSource="samplesHill.json"
        changeHandler={useCallback((option) => autoFill(option), [autoFill])}
        id="choicesHill"
        error
        errorSource={submit.error}
      />
    </Form>
  );
};

export default HillForm;
