import styles from "./Tab.module.css";

const Tab = ({ active, onClick, children }) => {
	return (
		<div
			className={`${styles.tab} ${active ? styles.active : ""}`}
			onClick={onClick}
			tabIndex="0"
		>
			{children}
		</div>
	);
};

export default Tab;
