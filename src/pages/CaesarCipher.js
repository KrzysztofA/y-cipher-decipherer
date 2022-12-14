import { useCallback } from "react";
import { useState } from "react";

import CaesarForm from "../components/CaesarForm";
import OutputWindow from "../components/OutputWindow";

const CaesarCipher = () => {
  const [output, setOutput] = useState("");

  const callOutput = useCallback((data) => {
    setOutput(() => data);
  }, []);

  console.log("CAESARCIPHER RERENDER");

  return (
    <>
      <h3>Y-Caesar Cipher Decipherer</h3>
      <CaesarForm setOutput={callOutput} />
      <OutputWindow output={output} />
    </>
  );
};

export default CaesarCipher;
