import React, { useEffect } from "react";

import styles from "./OutputWindow.module.css";

const OutputWindow = ({ output }) => {
  useEffect(() => {
    if (output) {
    }
  }, [output]);

  if (!output) return <div className={styles.window}></div>;
  return (
    <>
      <div className={styles.window}>
        {output.map((el) => {
          if (el.decodedMsg) {
            return (
              <div key={`1line${el.decodedMsg}`} className={styles.line}>
                {el.decodedMsg}
              </div>
            );
          } else if (el.message) {
            return (
              <div key={`2line${el.message}`} className={styles.line}>
                {el.message}
              </div>
            );
          } else if (el.altMessage) {
            return (
              <div key={`3line${el.altMessage}}`} className={styles.line}>
                {el.altMessage}
              </div>
            );
          } else {
            return "";
          }
        })}
      </div>
    </>
  );
};

export default React.memo(OutputWindow);
