import { useCallback, useState } from "react";

import HillForm from "../components/HillForm";
import OutputWindow from "../components/OutputWindow";

const HillCipher = () => {
  const [output, setOutput] = useState("");

  return (
    <>
      <h3>Y-Hill Cipher Decipherer</h3>
      <HillForm
        setOutput={useCallback(
          (data) => {
            setOutput(() => data);
          },
          [setOutput]
        )}
      />
      <OutputWindow output={output} />
    </>
  );
};

export default HillCipher;
