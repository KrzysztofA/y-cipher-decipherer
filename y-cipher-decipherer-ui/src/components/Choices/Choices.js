import styles from "./Choices.module.css";

import AutoFill from "../AutoFill/AutoFill";
import Submit from "../UI/SubmitButton/Submit";

const Choices = () => {
	return (
		<div className={styles.choices}>
			<AutoFill />
			<Submit />
		</div>
	);
};

export default Choices;
