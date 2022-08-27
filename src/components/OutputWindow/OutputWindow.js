import React, { useState, useEffect } from "react";

import styles from "./OutputWindow.module.css"

export default function OutputWindow() {
    const [output, setOutput] = React.useState(null);

    useEffect(() => {
        if(output) {
        }
    }, [output]);

    return (<>
        <div className={styles.window}>
            {output?.map((el, i) => {
                return <div key={`line${i}`} className={styles.line}>{el.msg}</div>
            })}
        </div>
        </>
    )
}