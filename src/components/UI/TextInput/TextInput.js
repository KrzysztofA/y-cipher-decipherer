import styles from "./TextInput.module.css";

const TextInput = ({ onChange, placeholder, value, id, errorSource }) => {
  return (
    <input
      className={styles.textInput}
      type="text"
      maxLength="256"
      id={id}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      aria-label="Input field for code to be decoded"
      aria-errormessage={`error${id}`}
      aria-invalid={errorSource ? true : false}
    />
  );
};

export default TextInput;
