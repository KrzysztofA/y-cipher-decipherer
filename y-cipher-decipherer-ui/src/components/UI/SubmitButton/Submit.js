import styles from "./Submit.module.css";

const Submit = () => {
  return (
    <button
      type="submit"
      className={styles.submit}
      title="Submit decode request on provided input"
    >
      Compute
    </button>
  );
};

export default Submit;
