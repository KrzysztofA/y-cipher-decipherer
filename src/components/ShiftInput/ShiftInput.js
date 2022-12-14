import styles from "./ShiftInput.module.css";

const ShiftInput = ({ shift, onChange }) => {
  return (
    <div className={styles.numberInput}>
      <label htmlFor="shift">Shift Value: </label>
      <input
        type="number"
        min="1"
        max="25"
        value={shift}
        id="shift"
        onChange={onChange}
      />
    </div>
  );
};

export default ShiftInput;
