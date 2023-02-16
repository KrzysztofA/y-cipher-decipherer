import styles from "./Choices.module.css";

import AutoFill from "../AutoFill";
import Submit from "../Submit";

const Choices = () => {
	return (
		<div className={styles.choices}>
			<AutoFill />
			<Submit />
		</div>
	);
};

export default Choices;
