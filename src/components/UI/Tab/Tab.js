import styles from "./Tab.module.css";

const Tab = ({ children, active, onClick }) => {
  return (
    <div
      className={`${styles.tab} ${active === "true" && styles.active}`}
      onClick={onClick}
      tabIndex="0"
    >
      {children}
    </div>
  );
};

export default Tab;
