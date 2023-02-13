import styles from "./TextInput.module.css";

const TextInput = ({ onChange, placeholder, value, id }) => {
  return (
    <input
      className={styles.textInput}
      type="text"
      maxLength="256"
      id={id}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
