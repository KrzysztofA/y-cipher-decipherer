import { useState } from "react";

const useErrorText = () => {
  const [errorText, setErrorText] = useState("");

  const errorSetHandler = (val) => {
    setErrorText(val);
  };

  const errorResetHandler = () => {
    setErrorText("");
  };

  return [errorText, errorSetHandler, errorResetHandler];
};

export default useErrorText;
