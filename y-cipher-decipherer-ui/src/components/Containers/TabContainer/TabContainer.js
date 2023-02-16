import styles from "./TabContainer.module.css";

import Tab from "../../UI/Tab";

const TabContainer = ({ tabLabels }) => {
	return (
		<nav
			role="navigation"
			aria-label="Main"
		>
			<span
				className={styles.tabContainer}
				role="tablist"
				aria-label="Cipher tab selection"
			>
				{Array.isArray(tabLabels) ? (
					tabLabels.map((label, i) => (
						<Tab
							ownedTab={i}
							label={label}
							key={label}
						/>
					))
				) : (
					<Tab
						ownedTab={0}
						label={tabLabels}
					/>
				)}
			</span>
		</nav>
	);
};

export default TabContainer;
