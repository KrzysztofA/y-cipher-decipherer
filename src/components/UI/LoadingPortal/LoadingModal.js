import React from "react";
import { createPortal } from "react-dom";

import styles from "./LoadingModal.module.css";

const Backdrop = () => {
  return <div className={styles.backdrop}></div>;
};

const LoadingIndicator = () => {
  return (
    <>
      <div className={styles.center}>
        <div className={styles.ring}></div>
        <span>Loading...</span>
      </div>
    </>
  );
};

const LoadingModal = () => {
  return (
    <>
      {createPortal(
        <LoadingIndicator />,
        document.getElementById("root-overlay")
      )}
      {createPortal(<Backdrop />, document.getElementById("root-backdrop"))}
    </>
  );
};

export default LoadingModal;
