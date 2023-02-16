import useAutoFill from "../../../hooks/high/useAutoFill";

import styles from "./AutoFill.module.css";

const AutoFill = () => {
	/* 
		Holds a collection of samples to use with the given cipher
		Data fetched from a single json file ideally passed by props.
		Data is divided into code and clue, where clue could be clue phrase,
		but also number of rails or number of letters shifted.
  */
	const [samples, fillChangeHandler] = useAutoFill();

	return (
		<select
			className={styles.autoFill}
			onChange={fillChangeHandler}
			aria-label="Autofill with sample value"
			id="autofill"
			tabIndex={0}
		>
			<option
				value=" "
				aria-selected="false"
				defaultValue
			>
				Select Sample
			</option>
			{samples?.map((x, i) => {
				return (
					<option
						className={styles.sample}
						key={["option", i + 1].join("")}
						aria-selected="false"
						value={`${[x.code.toUpperCase(), x.clue.toUpperCase()].join(",")}`}
					>
						{x.code.toUpperCase()}, {x.clue.toUpperCase()}
					</option>
				);
			})}
		</select>
	);
};

export default AutoFill;
