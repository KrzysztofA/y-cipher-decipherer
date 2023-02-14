import styles from "./TabContainer.module.css";

import Tab from "../UI/Tab";

const TabContainer = () => {
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
        <Tab
          ownedTab={0}
          label="Hill Cipher"
        />
        <Tab
          ownedTab={1}
          label="Caesar Cipher"
        />
        <Tab
          ownedTab={2}
          label="Rail Cipher"
        />
      </span>
    </nav>
  );
};

export default TabContainer;
