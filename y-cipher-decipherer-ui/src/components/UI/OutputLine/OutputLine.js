import styles from "./OutputLine.module.css";

const OutputLine = ({ children }) => {
  return <li className={styles.line}>{children}</li>;
};

export default OutputLine;
