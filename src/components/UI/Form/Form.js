import { Fragment, useContext } from "react";

import styles from "./Form.module.css";

import FormContext from "../../../hooks/context/FormContext";

import useFormSubmit from "../../../hooks/high/useFormSubmit";
import LoadingPortal from "../LoadingPortal";
import useLoading from "../../../hooks/low/useLoading";

const Form = ({ children }) => {
	const { codeHandle, clueHandle } = useContext(FormContext);

	const [loading, startLoading, stopLoading] = useLoading();

	// On Submits calls the back end to compute hill cipher based on code and clue provided
	const [submitHandler, submitError] = useFormSubmit(
		() => codeHandle.codeState.valid && clueHandle.clueState.valid,
		startLoading,
		stopLoading
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
