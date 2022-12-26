import { Fragment, useContext } from "react";

import styles from "./Form.module.css";

import FormContext from "../../../hooks/context/FormContext";

import useFormSubmit from "../../../hooks/high/useFormSubmit";
import LoadingPortal from "../LoadingPortal";

const Form = ({ children }) => {
	const { loading, codeHandle, clueHandle } = useContext(FormContext);

	// On Submits calls the back end to compute hill cipher based on code and clue provided
	const [submitHandler, submitError] = useFormSubmit(
		() => codeHandle.codeState.valid && clueHandle.clueState.valid
	);

	return (
		<>
			{loading && <LoadingPortal />}
			<form onSubmit={submitHandler}>
				<ul className={styles.formList}>
					{Array.isArray(children) &&
						children.map((child, i) => {
							return (
								<Fragment key={`FormItem ${i} ${child.props.id}`}>
									<li>{child}</li>
									{child.props.errorSource ? (
										<div className={styles.errorMessage}>
											{child.props.errorSource}
										</div>
									) : null}
								</Fragment>
							);
						})}
					<div className={styles.errorMessage}>{submitError}</div>
				</ul>
			</form>
		</>
	);
};

export default Form;
