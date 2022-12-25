import { useContext } from "react";

import styles from "./Tab.module.css";

import TabContext from "../../../hooks/context/TabContext";

const Tab = ({ children, ownedTab }) => {
	const { tab, setTab } = useContext(TabContext);

	return (
		<div
			className={`${styles.tab} ${ownedTab === tab ? styles.active : ""}`}
			onClick={() => setTab(ownedTab)}
			tabIndex="0"
		>
			{children}
		</div>
	);
};

export default Tab;
