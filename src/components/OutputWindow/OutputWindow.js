import { useContext } from "react";

import styles from "./OutputWindow.module.css";

import OutputContext from "../../hooks/context/OutputContext";

const OutputWindow = () => {
	const { output } = useContext(OutputContext);

	return (
		<>
			<ul className={styles.window}>
				{output?.map((element, i) => {
					if (element.message) {
						return (
							<li
								key={`line${i}`}
								className={styles.line}
							>
								{element.message}
							</li>
						);
					} else {
						return "";
					}
				})}
			</ul>
		</>
	);
};

export default OutputWindow;
