import styles from "./OutputWindow.module.css";

const OutputWindow = (props) => {
	return (
		<>
			<div className={styles.window}>
				{props.output?.map((element, i) => {
					if (element.decodedMsg) {
						return (
							<div
								key={`line${i}`}
								className={styles.line}
							>
								{element.decodedMsg}
							</div>
						);
					} else if (element.message) {
						return (
							<div
								key={`line${i}`}
								className={styles.line}
							>
								{element.message}
							</div>
						);
					} else if (element.altMessage) {
						return (
							<div
								key={`line${i}`}
								className={styles.line}
							>
								{element.altMessage}
							</div>
						);
					} else {
						return "";
					}
				})}
			</div>
		</>
	);
};

export default OutputWindow;
