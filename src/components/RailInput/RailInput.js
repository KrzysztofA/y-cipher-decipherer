import styles from "./RailInput.module.css";

const RailInput = (props) => {
  return (
    <div className={styles.numberInput}>
      <label htmlFor="rails">No. of Rails: </label>
      <input
        type="number"
        min="2"
        max="9999"
        value={props.rails}
        id="rails"
        onChange={props.onChange}
      />
    </div>
  );
};

export default RailInput;
