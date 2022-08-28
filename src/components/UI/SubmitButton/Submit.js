import React from "react";

import styles from "./Submit.module.css";

export default function Submit(props) {
    return (
        <button 
            type="submit"
            className={styles.submit}
        >
            Compute
        </button>
    );
}