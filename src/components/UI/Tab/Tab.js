import { useContext } from "react";

import styles from "./Tab.module.css";

import TabContext from "../../../hooks/context/TabContext";

const Tab = ({ ownedTab, label }) => {
  const { tab, setTab } = useContext(TabContext);

  const selected = ownedTab === tab;

  return (
    <button
      className={`${styles.tab} ${selected ? styles.active : ""}`}
      onClick={() => setTab(ownedTab)}
      tabIndex={selected ? -1 : 0}
      id={`tab${ownedTab}`}
      role="tab"
      aria-disabled={selected}
      aria-selected={selected}
      aria-controls={`form${ownedTab}`}
      aria-labelledby={`label${ownedTab}`}
    >
      <label
        id={`label${ownedTab}`}
        forhtml={`tab${ownedTab}`}
      >
        {label}
      </label>
    </button>
  );
};

export default Tab;
