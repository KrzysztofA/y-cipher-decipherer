import styles from "./OutputLine.module.css";

const OutputLine = ({ message }) => {
	return <li className={styles.line}>{message}</li>;
};

export default OutputLine;
