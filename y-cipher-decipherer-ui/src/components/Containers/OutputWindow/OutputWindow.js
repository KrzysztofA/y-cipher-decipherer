import { useContext } from "react";

import styles from "./OutputWindow.module.css";

import OutputContext from "../../../hooks/context/OutputContext";
import OutputLine from "../../UI/OutputLine";

const OutputWindow = () => {
	const { output } = useContext(OutputContext);

	return (
		<ul
			className={styles.window}
			role="log"
		>
			{output?.map((element, i) => {
				if (element.message) {
					return <OutputLine key={`line${i}`}>{element.message}</OutputLine>;
				} else {
					return "";
				}
			})}
		</ul>
	);
};

export default OutputWindow;
