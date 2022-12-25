import styles from "./Content.module.css";

// Default content wrapper with grid

const Content = ({ children }) => {
	return <main className={styles.content}>{children}</main>;
};

export default Content;
