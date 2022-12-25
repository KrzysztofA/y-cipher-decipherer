import styles from "./TabContainer.module.css";

import Tab from "../Tab";

const TabContainer = (props) => {
	const handleHillOnClick = () => {
		props.setActiveTab(0);
	};
	const handleCaesarOnClick = () => {
		props.setActiveTab(1);
	};
	const handleRailOnClick = () => {
		props.setActiveTab(2);
	};

	return (
		<nav className={styles.tabContainer}>
			<Tab
				active={props.activeTab === 0 ? true : false}
				onClick={props.activeTab === 0 ? null : handleHillOnClick}
			>
				Hill Cipher
			</Tab>
			<Tab
				active={props.activeTab === 1 ? true : false}
				onClick={props.activeTab === 1 ? null : handleCaesarOnClick}
			>
				Caesar Cipher
			</Tab>
			<Tab
				active={props.activeTab === 2 ? true : false}
				onClick={props.activeTab === 2 ? null : handleRailOnClick}
			>
				Rail Cipher
			</Tab>
		</nav>
	);
};

export default TabContainer;
