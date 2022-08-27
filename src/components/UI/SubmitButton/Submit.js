import React from "react";

import styles from "./Submit.module.css";

export default function Submit() {
    return (
        <button 
            type="submit"
            className={styles.submit}
        >
            Compute
        </button>
    );
}