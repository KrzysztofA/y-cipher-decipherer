import styles from "./TextInput.module.css";

const TextInput = ({ className, id, onChange, value, placeholder }) => {
  return (
    <input
      className={[styles.textInput, className].join(" ")}
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
