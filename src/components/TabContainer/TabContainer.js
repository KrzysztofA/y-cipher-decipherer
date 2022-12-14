import Tab from "../UI/Tab";

import styles from "./TabContainer.module.css";

const TabContainer = ({ activeTab, setActiveTab }) => {
  const handleHillOnClick = () => {
    setActiveTab(0);
  };
  const handleCaesarOnClick = () => {
    setActiveTab(1);
  };
  const handleRailOnClick = () => {
    setActiveTab(2);
  };

  return (
    <nav className={styles.tabContainer}>
      <Tab
        active={`${activeTab === 0 ? "true" : "false"}`}
        onClick={activeTab === 0 ? null : handleHillOnClick}
      >
        Hill Cipher
      </Tab>
      <Tab
        active={`${activeTab === 1 ? "true" : "false"}`}
        onClick={activeTab === 1 ? null : handleCaesarOnClick}
      >
        Caesar Cipher
      </Tab>
      <Tab
        active={`${activeTab === 2 ? "true" : "false"}`}
        onClick={activeTab === 2 ? null : handleRailOnClick}
      >
        Rail Cipher
      </Tab>
    </nav>
  );
};

export default TabContainer;
