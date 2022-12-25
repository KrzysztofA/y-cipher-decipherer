import styles from "./TextInput.module.css";

export default function TextInput({ onChange, placeholder, value, id }) {
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
}
