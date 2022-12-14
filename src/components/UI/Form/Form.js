import React from "react";

import LoadingModal from "../LoadingPortal/LoadingModal";

import styles from "./Form.module.css";

const Form = ({ children, loading, onSubmit, id }) => {
  return (
    <>
      {loading && <LoadingModal />}
      <form onSubmit={onSubmit}>
        <ul className={styles.formList}>
          {children.map((child) => {
            return (
              <React.Fragment key={child.props.id + "form"}>
                <li>{child}</li>
                {child.props.error && (
                  <div className={styles.errorMessage}>
                    {child.props.errorSource}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </form>
    </>
  );
};

export default Form;
