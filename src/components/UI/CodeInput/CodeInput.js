import React from "react";

import TextInput from "../TextInput";

import styles from "./CodeInput.module.css";

const CodeInput = ({ id, onChange, value, placeholder }) => {
  console.log("CodeInput");
  return (
    <TextInput
      className={styles.codeInput}
      id={id}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default React.memo(CodeInput);
