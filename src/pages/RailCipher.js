import { useState } from "react";

import RailForm from "../components/RailForm";
import OutputWindow from "../components/OutputWindow";

const RailCipher = () => {
  const [output, setOutput] = useState(null);

  return (
    <>
      <h3>Y-Rail Cipher Decipherer</h3>
      <RailForm setOutput={setOutput} />
      <OutputWindow output={output} />
    </>
  );
};

export default RailCipher;
