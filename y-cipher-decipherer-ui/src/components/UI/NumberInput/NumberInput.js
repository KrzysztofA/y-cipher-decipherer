import styles from "./NumberInput.module.css";

const NumberInput = ({ id, label, value, onChange, min, max }) => {
  return (
    <div className={styles.numberInput}>
      <label
        htmlFor={id}
        id={`label${id}`}
      >
        {label}
      </label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        id={id}
        onChange={onChange}
        className={styles.number}
        role="spinbutton"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-labelledby={`label${id}`}
      />
    </div>
  );
};

export default NumberInput;
