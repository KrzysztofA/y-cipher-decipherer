import { Fragment, useContext } from "react";

import styles from "./Form.module.css";

import FormContext from "../../../hooks/context/FormContext";

import useFormSubmit from "../../../hooks/high/useFormSubmit";
import LoadingPortal from "../../Compound/LoadingPortal";
import useLoading from "../../../hooks/low/useLoading";

const Form = ({ children, tabIndex }) => {
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
			<form
				onSubmit={submitHandler}
				aria-busy={loading}
			>
				<ul className={styles.formList}>
					{Array.isArray(children) &&
						children.map((child, i) => {
							return (
								<Fragment key={`FormItem ${i} ${child.props.id}`}>
									<li>{child}</li>
									{child.props.errorSource ? (
										<div
											className={styles.errorMessage}
											role="status"
											id={`error${child.props.id}`}
										>
											{child.props.errorSource}
										</div>
									) : child.props.errorSource === "" ? (
										<div className={styles.errorMessage} />
									) : null}
								</Fragment>
							);
						})}
					<div
						role="alert"
						className={styles.errorMessage}
						id="submiterror"
					>
						{submitError}
					</div>
				</ul>
			</form>
		</>
	);
};

export default Form;
