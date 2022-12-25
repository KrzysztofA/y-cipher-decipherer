import { Fragment, useContext } from "react";

import styles from "./Form.module.css";

import FormContext from "../../../hooks/context/FormContext";

import LoadingPortal from "../LoadingPortal";

const Form = ({ children }) => {
	const { loading, onSubmit } = useContext(FormContext);

	return (
		<>
			{loading && <LoadingPortal />}
			<form onSubmit={onSubmit}>
				<ul className={styles.formList}>
					{Array.isArray(children) &&
						children.map((child, i) => {
							return (
								<Fragment key={`FormItem ${i} ${child.props.id}`}>
									<li>{child}</li>
									<div className={styles.errorMessage}>
										{child.props.errorSource}
									</div>
								</Fragment>
							);
						})}
				</ul>
			</form>
		</>
	);
};

export default Form;
