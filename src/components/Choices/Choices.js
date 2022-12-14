import React, { useCallback } from "react";

import AutoFill from "../AutoFill";
import Submit from "../UI/Submit";

import styles from "./Choices.module.css";

const Choices = ({ dataSource, changeHandler }) => {
  return (
    <div className={styles.choices}>
      <AutoFill
        dataSource={dataSource}
        changeHandler={useCallback(
          (option) => changeHandler(option),
          [changeHandler]
        )}
      />
      <Submit />
    </div>
  );
};

export default Choices;
