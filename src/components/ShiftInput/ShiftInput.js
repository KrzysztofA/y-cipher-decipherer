import styles from "./ShiftInput.module.css";

const ShiftInput = (props) => {
  return (
    <div className={styles.numberInput}>
      <label htmlFor="shift">Shift Value: </label>
      <input
        type="number"
        min="1"
        max="25"
        value={props.shift}
        id="shift"
        onChange={props.onChange}
      />
    </div>
  );
};

export default ShiftInput;
