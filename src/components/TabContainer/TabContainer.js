import styles from "./TabContainer.module.css";

import Tab from "../UI/Tab";

const TabContainer = () => {
	return (
		<nav className={styles.tabContainer}>
			<Tab ownedTab={0}>Hill Cipher</Tab>
			<Tab ownedTab={1}>Caesar Cipher</Tab>
			<Tab ownedTab={2}>Rail Cipher</Tab>
		</nav>
	);
};

export default TabContainer;
