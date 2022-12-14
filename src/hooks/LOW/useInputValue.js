import { useState } from "react";

/**
 * Handler of numerical input value used in ciphers
 * @returns {*} value and handler of setting the value and handler to value input change
 */
const useInputValue = (val = 1) => {
  // Input value state
  const [value, setValue] = useState(val);

  // Handles changing input value
  const valueInputHandler = (ev) => {
    setValue(ev.target.value);
  };

  // Handles setting input value
  const setValueHandler = (val) => {
    setValue(val);
  };

  return [value, setValueHandler, valueInputHandler];
};

export default useInputValue;
